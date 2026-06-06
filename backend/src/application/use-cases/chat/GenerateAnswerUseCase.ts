import { AppError } from "../../../domain/errors/AppError";
import { IChatRepository } from "../../../domain/repositories/IChatRepository";
import { IDocumentChunkRepository } from "../../../domain/repositories/IDocumentChunkRepository";
import { IDocumentRepository } from "../../../domain/repositories/IDocumentRepository";
import { CREDIT_COSTS } from "../../constants/enums/creditCost";
import { statusCode } from "../../constants/enums/statusCode";
import { docMessages } from "../../constants/messages/docMessages";
import { GenerateAnswerDTO, GenerateAnswerResponseDTO } from "../../dtos/chat/GenerateAnswerDTO";
import { IAICreditService } from "../../interfaces/services/ai/IAICreditService";
import { IAIService } from "../../interfaces/services/ai/IAIService";
import { IEmbeddingService } from "../../interfaces/services/ai/IEmbeddingService";
import { IGenerateAnswerUseCase } from "../../interfaces/usecases/chat/IGenerateAnswerUseCase";
import { ISaveChatHistoryUseCase } from "../../interfaces/usecases/chat/ISaveChatHistoryUseCase";

export class GenerateAnswerUseCase implements IGenerateAnswerUseCase {

    constructor(
        private readonly _documentRepository: IDocumentRepository,
        private readonly _documentChunkRepository: IDocumentChunkRepository,
        private readonly _embeddingService: IEmbeddingService,
        private readonly _aiService: IAIService,
        private readonly _chatRepository: IChatRepository,
        private readonly _aiCreditService: IAICreditService,
        private readonly _saveChatHistoryUseCase: ISaveChatHistoryUseCase,

        private readonly _retrievalLimit = 10,
    ) { }

    async execute(data: GenerateAnswerDTO): Promise<GenerateAnswerResponseDTO> {

        const document = await this._documentRepository.findByUserAndId(data.userId, data.documentId);

        if (!document) {
            throw new AppError(docMessages.error.DOCUMENT_NOT_FOUND, statusCode.NOT_FOUND);
        }

        if (document.status !== "READY") {
            throw new AppError(docMessages.error.DOCUMENT_NOT_READY, statusCode.BAD_REQUEST);
        }

        await this._aiCreditService.validateCredits(data.userId, CREDIT_COSTS.CHAT);

        const history = await this._chatRepository.getRecentMessages(data.userId, data.documentId,6);

        const standaloneQuestion = await this._aiService.rewriteQuestion(data.question, history);

        //Question to Embedding
        const questionEmbedding = await this._embeddingService.generateEmbedding(standaloneQuestion);

        //Vector search
        const chunks = await this._documentChunkRepository
            .findSimilarChunks(questionEmbedding, this._retrievalLimit, data.documentId);

        if (chunks.length === 0) {

            const fallbackAnswer =
                "I could not find relevant information in the document.";

            await this._saveChatHistoryUseCase.execute({
                userId: data.userId,
                documentId: data.documentId,

                messages: [
                    {
                        role: "USER",
                        content: data.question,
                    },
                    {
                        role: "ASSISTANT",
                        content: fallbackAnswer,
                    },
                ],
            });

            return {
                answer: fallbackAnswer,
                sources: [],
            };
        }

        const context = chunks
            .map((chunk) => chunk.content)
            .join("\n\n");

        const answer = await this._aiService.generateAnswer(data.question, context);

        await this._aiCreditService.consumeCredits(data.userId, CREDIT_COSTS.CHAT);

        await this._saveChatHistoryUseCase.execute({
            userId: data.userId,
            documentId: data.documentId,

            messages: [
                {
                    role: "USER",
                    content: data.question,
                },
                {
                    role: "ASSISTANT",
                    content: answer,
                },
            ],
        })

        return {
            answer,
            sources: chunks.map((chunk) => ({
                chunkId: chunk.getId(),
                pageNumber: chunk.metadata.pageNumber
            })),
        }
    }
}