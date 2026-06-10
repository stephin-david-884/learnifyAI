import { Request, Response } from "express";
import { statusCode } from "../../../application/constants/enums/statusCode";

import { mapToGenerateQuizDTO } from "../../../application/mappers/quiz/GenerateQuizMapper";

import { IGenerateQuizUseCase } from "../../../application/interfaces/usecases/quiz/IGenerateQuizUseCase";
import { asyncHandler } from "../../http/asyncHandler";
import { sendSuccess } from "../../http/response";
import { quizMessages } from "../../../application/constants/messages/quizMessages";
import { IGetUserQuizzesUseCase } from "../../../application/interfaces/usecases/quiz/IGetUserQuizzesUseCase";
import { IGetQuizUseCase } from "../../../application/interfaces/usecases/quiz/IGetQuizUseCase";
import { mapToGetQuizDTO } from "../../../application/mappers/quiz/GetQuizMapper";
import { mapToGetUserQuizzesDTO } from "../../../application/mappers/quiz/GetUserQuizzesMapper";
import { ISubmitQuizUseCase } from "../../../application/interfaces/usecases/quiz/ISubmitQuizUseCase";
import { mapToSubmitQuizDTO } from "../../../application/mappers/quiz/SubmitQuizMapper";

export class QuizController {

    constructor(
        private readonly _generateQuizUseCase: IGenerateQuizUseCase,
        private readonly _getQuizUseCase: IGetQuizUseCase,
        private readonly _getUserQuizzesUseCase: IGetUserQuizzesUseCase,
        private readonly _submitQuizUseCase: ISubmitQuizUseCase,
    ) { }

    generateQuiz = asyncHandler(async (req: Request, res: Response) => {

        const data = mapToGenerateQuizDTO(req);

        const quiz = await this._generateQuizUseCase.execute(data);

        return sendSuccess(
            res,
            statusCode.CREATED,
            quizMessages.success.QUIZ_GENERATED,
            quiz
        );
    }
    );

    getQuiz = asyncHandler(async (req: Request, res: Response) => {

        const data = mapToGetQuizDTO(req);

        const quiz = await this._getQuizUseCase.execute(data);

        return sendSuccess(
            res,
            statusCode.OK,
            "Quiz fetched successfully",
            quiz
        );
    }
    );

    getUserQuizzes = asyncHandler(async (req: Request, res: Response) => {

        const data = mapToGetUserQuizzesDTO(req);

        const quizzes = await this._getUserQuizzesUseCase.execute(data);

        return sendSuccess(
            res,
            statusCode.OK,
            "Quizzes fetched successfully",
            quizzes
        );
    }
    );

    submitQuiz = asyncHandler(async (req: Request, res: Response) => {

        const data = mapToSubmitQuizDTO(req);

        const result = await this._submitQuizUseCase.execute(data);

        return sendSuccess(
            res,
            statusCode.OK,
            "Quiz submitted successfully",
            result
        );
    }
    );
}