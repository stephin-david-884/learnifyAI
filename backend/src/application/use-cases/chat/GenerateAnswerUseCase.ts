import { AppError } from "../../../domain/errors/AppError";
import { IDocumentChunkRepository } from "../../../domain/repositories/IDocumentChunkRepository";
import { IDocumentRepository } from "../../../domain/repositories/IDocumentRepository";
import { CREDIT_COSTS } from "../../constants/enums/creditCost";
import { statusCode } from "../../constants/enums/statusCode";
import { docMessages } from "../../constants/messages/docMessages";
import { GenerateAnswerDTO, GenerateAnswerResponseDTO } from "../../dtos/chat/GenerateAnswerDTO";
import { IAICreditService } from "../../interfaces/services/ai/IAICreditService";
import { IAIService } from "../../interfaces/services/ai/IAIService";
import { IEmbeddingService } from "../../interfaces/services/ai/IEmbeddingService";
import { ICreditService } from "../../interfaces/services/subscription/ICreditService";
import { IGenerateAnswerUseCase } from "../../interfaces/usecases/chat/IGenerateAnswerUseCase";
import { IConsumeCreditsUseCase } from "../../interfaces/usecases/subscription/IConsumeCreditsUseCase";

export class GenerateAnswerUseCase implements IGenerateAnswerUseCase {

    constructor(
        private readonly _documentRepository: IDocumentRepository,
        private readonly _documentChunkRepository: IDocumentChunkRepository,
        private readonly _embeddingService: IEmbeddingService,
        private readonly _aiService: IAIService,

        private readonly _aiCreditService: IAICreditService,

        private readonly _retrievalLimit = 10,
    ) {}

    async execute(data: GenerateAnswerDTO): Promise<GenerateAnswerResponseDTO> {
        
        const document = await this._documentRepository.findByUserAndId(data.userId, data.documentId);

        if(!document) {
            throw new AppError(docMessages.error.DOCUMENT_NOT_FOUND, statusCode.NOT_FOUND);
        }

        if(document.status !== "READY") {
            throw new AppError(docMessages.error.DOCUMENT_NOT_READY, statusCode.BAD_REQUEST);
        }

        await this._aiCreditService.consumeForAIUsage(data.userId, CREDIT_COSTS.CHAT);

        //Question to Embedding
        const questionEmbedding = await this._embeddingService.generateEmbedding(data.question);

        //Vector search
        const chunks = await this._documentChunkRepository.findSimilarChunks(questionEmbedding, this._retrievalLimit, data.documentId);

        if(chunks.length === 0) {
            return {
                answer: "I could not find relevant information in the document.",

                sources:[],
            }
        };

        const context = chunks
                            .map((chunk) => chunk.content)
                            .join("\n\n");

        const answer = await this._aiService.generateAnswer(data.question, context);
        
        return {
            answer,
             sources: chunks.map((chunk) => ({
                chunkId: chunk.getId(),
                pageNumber: chunk.metadata.pageNumber
             })),
        }
    }
}