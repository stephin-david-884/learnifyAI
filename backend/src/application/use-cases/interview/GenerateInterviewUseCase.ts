import { Interview } from "../../../domain/entities/Interview.entity";
import { AppError } from "../../../domain/errors/AppError";
import { IDocumentChunkRepository } from "../../../domain/repositories/IDocumentChunkRepository";
import { IDocumentRepository } from "../../../domain/repositories/IDocumentRepository";
import { IInterviewRepository } from "../../../domain/repositories/IInterviewRepository";
import { IUserSubscriptionRepository } from "../../../domain/repositories/IUserSubscriptionRepository";
import { CREDIT_COSTS } from "../../constants/enums/creditCost";
import { statusCode } from "../../constants/enums/statusCode";
import { docMessages } from "../../constants/messages/docMessages";
import { interviewMessages } from "../../constants/messages/interviewMessages";
import { subMessages } from "../../constants/messages/subMessags";
import { GenerateInterviewDTO } from "../../dtos/interview/GenerateInterviewDTO";
import { GenerateInterviewResponseDTO } from "../../dtos/interview/GenerateInterviewResponseDTO";
import { IAICreditService } from "../../interfaces/services/ai/IAICreditService";
import { IInterviewGenerationService } from "../../interfaces/services/ai/IInterviewGenerationService";
import { IGenerateInterviewUseCase } from "../../interfaces/usecases/interview/IGenerateInterviewUseCase";

export class GenerateInterviewUseCase implements IGenerateInterviewUseCase {

    constructor(
        private readonly _interviewRepository: IInterviewRepository,
        private readonly _documentRepository: IDocumentRepository,
        private readonly _documentChunkRepository: IDocumentChunkRepository,
        private readonly _interviewGenerationService: IInterviewGenerationService,
        private readonly _subscriptionRepository: IUserSubscriptionRepository,
        private readonly _aiCreditService: IAICreditService,
    ) { }

    async execute(data: GenerateInterviewDTO): Promise<GenerateInterviewResponseDTO> {

        const document =
            await this._documentRepository.findByUserAndId(
                data.userId,
                data.documentId
            );

        if (!document) {
            throw new AppError(docMessages.error.DOCUMENT_NOT_FOUND, statusCode.NOT_FOUND);
        }

        if (document.status !== "READY") {
            throw new AppError(docMessages.error.DOCUMENT_NOT_READY, statusCode.BAD_REQUEST);
        }

        const subscription =
            await this._subscriptionRepository
                .findActiveByUserId(data.userId);

        if (!subscription) {
            throw new AppError(subMessages.error.SUBSCRIPTION_NOT_ACTIVE, statusCode.FORBIDDEN);
        }

        if (!subscription.planSnapshot.features.interviewAccess) {
            throw new AppError(interviewMessages.error.INTERVIEW_UNAVAILABLE, statusCode.FORBIDDEN);
        }

        const creditCost = data.questionCount === 5 ? CREDIT_COSTS.INTERVIEW_5 : CREDIT_COSTS.INTERVIEW_10;

        await this._aiCreditService.validateCredits(data.userId, creditCost);

        if ( !data.topics || data.topics.length < 2) {
            throw new AppError(interviewMessages.error.INVALID_TOPIC_COUNT, statusCode.BAD_REQUEST);
        }

        const availableTopics =
            document.topics.map(
                topic => topic.name
            );

        const invalidTopics =
            data.topics.filter(
                topic =>
                    !availableTopics.includes(topic)
            );

        if (invalidTopics.length > 0) {
            throw new AppError("Invalid topics selected", statusCode.BAD_REQUEST);
        }

        const chunks =
            await this._documentChunkRepository
                .findByDocumentAndTopics(
                    data.documentId,
                    data.topics
                );

        if (!chunks.length) {
            throw new AppError("No content found for selected topics", statusCode.BAD_REQUEST);
        }

        const context =
            chunks
                .slice(0,50)
                .map(chunk=>chunk.content)
                .join("\n\n");

        const questions =
            await this._interviewGenerationService
                .generateInterview(
                    context,
                    data.topics,
                    data.questionCount
                );

        const interview = new Interview({
            userId:data.userId,

                documentId:data.documentId,

                title:
                    data.title ??
                    `${document.title} Interview`,

                generatedFromTopics:
                    data.topics,

                totalQuestions:
                    questions.length,

                questions,

                overallScore:0,

                answers:[],

                status:"READY",
        });
        
        const saved = await this._interviewRepository.save(interview);

        await this._aiCreditService.consumeCredits(data.userId, creditCost);

        return {
            interviewId: saved.getId()
        }
    }
}