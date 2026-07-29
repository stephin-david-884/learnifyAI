import { IGenerateAnswerUseCase } from "../../application/interfaces/usecases/chat/IGenerateAnswerUseCase";
import { IGetChatHistoryUseCase } from "../../application/interfaces/usecases/chat/IGetChatHistoryUseCase";
import { ISaveChatHistoryUseCase } from "../../application/interfaces/usecases/chat/ISaveChatHistoryUseCase";
import { IDeleteFlashcardSetUseCase } from "../../application/interfaces/usecases/flashcard/IDeleteFlashcardSetUseCase";
import { IGenerateFlashcardsUseCase } from "../../application/interfaces/usecases/flashcard/IGenerateFlashcardsUseCase";
import { IGetFlashcardSetUseCase } from "../../application/interfaces/usecases/flashcard/IGetFlashcardSetUseCase";
import { IGetUserFlashcardSetsUseCase } from "../../application/interfaces/usecases/flashcard/IGetUserFlashcardSetsUseCase";
import { ICompleteInterviewUseCase } from "../../application/interfaces/usecases/interview/ICompleteInterviewUseCase";
import { IGenerateInterviewUseCase } from "../../application/interfaces/usecases/interview/IGenerateInterviewUseCase";
import { IGetInterviewResultUseCase } from "../../application/interfaces/usecases/interview/IGetInterviewResultUseCase";
import { IGetInterviewUseCase } from "../../application/interfaces/usecases/interview/IGetInterviewUseCase";
import { IGetUserInterviewsUseCase } from "../../application/interfaces/usecases/interview/IGetUserInterviewsUseCase";
import { IStartInterviewUseCase } from "../../application/interfaces/usecases/interview/IStartInterviewUseCase";
import { ISubmitInterviewUseCase } from "../../application/interfaces/usecases/interview/ISubmitInterviewUseCase";
import { IGenerateQuizUseCase } from "../../application/interfaces/usecases/quiz/IGenerateQuizUseCase";
import { IGetQuizResultUseCase } from "../../application/interfaces/usecases/quiz/IGetQuizResultUseCase";
import { IGetQuizUseCase } from "../../application/interfaces/usecases/quiz/IGetQuizUseCase";
import { IGetUserQuizzesUseCase } from "../../application/interfaces/usecases/quiz/IGetUserQuizzesUseCase";
import { ISubmitQuizUseCase } from "../../application/interfaces/usecases/quiz/ISubmitQuizUseCase";
import { IConsumeCreditsUseCase } from "../../application/interfaces/usecases/subscription/IConsumeCreditsUseCase";
import { GenerateAnswerUseCase } from "../../application/use-cases/chat/GenerateAnswerUseCase";
import { GetChatHistoryUseCase } from "../../application/use-cases/chat/GetChatHistoryUseCase";
import { SaveChatHistoryUseCase } from "../../application/use-cases/chat/SaveChatHistoryUseCase";
import { DeleteFlashcardSetUseCase } from "../../application/use-cases/flashcard/DeleteFlashcardSetUseCase";
import { GenerateFlashcardsUseCase } from "../../application/use-cases/flashcard/GenerateFlashcardsUseCase";
import { GetFlashcardSetUseCase } from "../../application/use-cases/flashcard/GetFlashcardSetUseCase";
import { GetUserFlashcardSetsUseCase } from "../../application/use-cases/flashcard/GetUserFlashcardSetsUseCase";
import { CompleteInterviewUseCase } from "../../application/use-cases/interview/CompleteInterviewUseCase";
import { GenerateInterviewUseCase } from "../../application/use-cases/interview/GenerateInterviewUseCase";
import { GetInterviewResultUseCase } from "../../application/use-cases/interview/GetInterviewResultUseCase";
import { GetInterviewUseCase } from "../../application/use-cases/interview/GetInterviewUseCase";
import { GetUserInterviewsUseCase } from "../../application/use-cases/interview/GetUserInterviewsUseCase";
import { StartInterviewUseCase } from "../../application/use-cases/interview/StartInterviewUseCase";
import { SubmitInterviewUseCase } from "../../application/use-cases/interview/SubmitInterviewUseCase";
import { GenerateQuizUseCase } from "../../application/use-cases/quiz/GenerateQuizUseCase";
import { GetQuizResultUseCase } from "../../application/use-cases/quiz/GetQuizResultUseCase";
import { GetQuizUseCase } from "../../application/use-cases/quiz/GetQuizUseCase";
import { GetUserQuizzesUseCase } from "../../application/use-cases/quiz/GetUserQuizzesUseCase";
import { SubmitQuizUseCase } from "../../application/use-cases/quiz/SubmitQuizUseCase";
import { ConsumeCreditsUseCase } from "../../application/use-cases/subscription/ConsumeCreditsUseCase";
import { ChatController } from "../../interfaces/controllers/ai/ChatController";
import { FlashcardController } from "../../interfaces/controllers/ai/FlashcardController";
import { InterviewController } from "../../interfaces/controllers/ai/InterviewController";
import { QuizController } from "../../interfaces/controllers/ai/QuizController";
import { AIUsageRepository } from "../repositories/AIUsageRepository";
import { ChatRepository } from "../repositories/ChatRepository";
import { DocumentChunkRepository } from "../repositories/DocumentChunkRepository";
import { DocumentRepository } from "../repositories/DocumentRepository";
import { FlashcardSetRepository } from "../repositories/FlashcardSetRepository";
import { InterviewRepository } from "../repositories/InterviewRepository";
import { QuizRepository } from "../repositories/QuizRepository";
import { UserRepository } from "../repositories/UserRepository";
import { UserSubscriptionRepository } from "../repositories/UserSubscriptionRepository";
import { AICreditService } from "../services/ai/AICreditService";
import { GeminiAIService } from "../services/ai/GeminiAIService";
import { GoogleEmbeddingService } from "../services/ai/GeminiEmbeddingService";
import { GroqFlashcardGenerationService } from "../services/ai/GroqFlashcardGenerationService";
import { GroqInterviewEvaluationService } from "../services/ai/GroqInterviewEvaluationService";
import { GroqInterviewGenerationService } from "../services/ai/GroqInterviewGenerationService";
import { GroqQuizGenerationService } from "../services/ai/GroqQuizGenerationService";
import { AICostEstimator } from "../services/analytics/AICostEstimator";
import { AIUsageRecorder } from "../services/analytics/AIUsageRecorder";
import { AIUsageTracker } from "../services/analytics/AIUsageTracker";
import { CreditService } from "../services/subscription/CreditService";
import { SubscriptionService } from "../services/subscription/SubscriptionService";

// REPOSITORIES
const documentRepository = new DocumentRepository();
const documentChunkRepository = new DocumentChunkRepository();
const chatRepository = new ChatRepository();
const userRepository = new UserRepository();
const userSubscriptionRepository = new UserSubscriptionRepository();
const quizRepository = new QuizRepository();
const interviewRepository = new InterviewRepository();
const flashcardSetRepository = new FlashcardSetRepository();
const aiUsageRepository = new AIUsageRepository();;

//SERVICES
const embeddingService = new GoogleEmbeddingService();
const aiService = new GeminiAIService();
const subscriptionService = new SubscriptionService(
    userSubscriptionRepository,
    userRepository
);
const creditService = new CreditService(
    userSubscriptionRepository,
    subscriptionService
);
const costEstimator =
    new AICostEstimator();

const tracker =
    new AIUsageTracker(aiUsageRepository);

const usageRecorder =
    new AIUsageRecorder(
        tracker,
        costEstimator
    );


const quizGenerationService = new GroqQuizGenerationService();

const interviewGenerationService = new GroqInterviewGenerationService(usageRecorder);

const interviewEvaluationService = new GroqInterviewEvaluationService(usageRecorder);

const flashcardAIService = new GroqFlashcardGenerationService(usageRecorder);

//USECASES

const consumeCreditsUseCase: IConsumeCreditsUseCase = new ConsumeCreditsUseCase(creditService);

const aiCreditService = new AICreditService(
    userRepository,
    subscriptionService,
    consumeCreditsUseCase
);

const saveChatHistoryUseCase: ISaveChatHistoryUseCase =
    new SaveChatHistoryUseCase(
        chatRepository
    );

const getChatHistoryUseCase: IGetChatHistoryUseCase =
    new GetChatHistoryUseCase(
        chatRepository
    );

const generateAnswerUseCase: IGenerateAnswerUseCase =
    new GenerateAnswerUseCase(
        documentRepository,
        documentChunkRepository,
        embeddingService,
        aiService,
        chatRepository,
        aiCreditService,
        saveChatHistoryUseCase
    );

const generateQuizUseCase: IGenerateQuizUseCase =
    new GenerateQuizUseCase(
        quizRepository,
        documentRepository,
        documentChunkRepository,
        quizGenerationService,
        aiCreditService
    );

const getQuizUseCase: IGetQuizUseCase =
    new GetQuizUseCase(
        quizRepository
    );

const getUserQuizzesUseCase: IGetUserQuizzesUseCase =
    new GetUserQuizzesUseCase(
        quizRepository
    );

const submitQuizUseCase: ISubmitQuizUseCase =
    new SubmitQuizUseCase(
        quizRepository
    );

const getQuizResultUseCase: IGetQuizResultUseCase =
    new GetQuizResultUseCase(
        quizRepository
    );

const generateInterviewUseCase: IGenerateInterviewUseCase =
    new GenerateInterviewUseCase(
        interviewRepository,
        documentRepository,
        documentChunkRepository,
        interviewGenerationService,
        userSubscriptionRepository,
        aiCreditService,
    );

const getInterviewUseCase: IGetInterviewUseCase =
    new GetInterviewUseCase(
        interviewRepository,
    );

const getUserInterviewsUseCase: IGetUserInterviewsUseCase =
    new GetUserInterviewsUseCase(
        interviewRepository
    );

const submitInterviewUseCase: ISubmitInterviewUseCase =
    new SubmitInterviewUseCase(
        interviewRepository,
    );

const getInterviewResultUseCase: IGetInterviewResultUseCase =
    new GetInterviewResultUseCase(
        interviewRepository,
    );

const completeInterviewUseCase: ICompleteInterviewUseCase =
    new CompleteInterviewUseCase(
        interviewRepository,
        interviewEvaluationService,
    );

const startInterviewUseCase: IStartInterviewUseCase =
    new StartInterviewUseCase(
        interviewRepository
    );

const generateFlashcardsUseCase: IGenerateFlashcardsUseCase =
    new GenerateFlashcardsUseCase(
        flashcardSetRepository,
        documentRepository,
        documentChunkRepository,
        flashcardAIService,
        aiCreditService
    );

const getUserFlashcardSetsUseCase: IGetUserFlashcardSetsUseCase =
    new GetUserFlashcardSetsUseCase(
        flashcardSetRepository
    );

const getFlashcardSetUseCase: IGetFlashcardSetUseCase =
    new GetFlashcardSetUseCase(
        flashcardSetRepository
    );

const deleteFlashcardSetUseCase: IDeleteFlashcardSetUseCase =
    new DeleteFlashcardSetUseCase(
        flashcardSetRepository
    );

// CONTROLLER
export const chatController =
    new ChatController(
        getChatHistoryUseCase,
        generateAnswerUseCase
    );

export const quizController =
    new QuizController(
        generateQuizUseCase,
        getQuizUseCase,
        getUserQuizzesUseCase,
        submitQuizUseCase,
        getQuizResultUseCase
    );

export const interviewController =
    new InterviewController(
        generateInterviewUseCase,
        getInterviewUseCase,
        getUserInterviewsUseCase,
        submitInterviewUseCase,
        getInterviewResultUseCase,
        completeInterviewUseCase,
        startInterviewUseCase,
    );

export const flashcardController =
    new FlashcardController(
        generateFlashcardsUseCase,
        getUserFlashcardSetsUseCase,
        getFlashcardSetUseCase,
        deleteFlashcardSetUseCase
    )    