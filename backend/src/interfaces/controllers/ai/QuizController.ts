import { Request, Response } from "express";
import { statusCode } from "../../../application/constants/enums/statusCode";

import { mapToGenerateQuizDTO } from "../../../application/mappers/quiz/GenerateQuizMapper";

import { IGenerateQuizUseCase } from "../../../application/interfaces/usecases/quiz/IGenerateQuizUseCase";
import { asyncHandler } from "../../http/asyncHandler";
import { sendSuccess } from "../../http/response";
import { quizMessages } from "../../../application/constants/messages/quizMessages";

export class QuizController {

    constructor(
        private readonly _generateQuizUseCase: IGenerateQuizUseCase,
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
}