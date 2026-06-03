import { Request, Response } from "express";
import { IGenerateAnswerUseCase } from "../../../application/interfaces/usecases/chat/IGenerateAnswerUseCase";
import { asyncHandler } from "../../http/asyncHandler";
import { mapToGenerateAnswerDTO } from "../../../application/mappers/chat/mapToGenerateAnswerDTO";
import { sendSuccess } from "../../http/response";
import { statusCode } from "../../../application/constants/enums/statusCode";
import { aiMessages } from "../../../application/constants/messages/aiMessages";
import { IGetChatHistoryUseCase } from "../../../application/interfaces/usecases/chat/IGetChatHistoryUseCase";
import { mapToGetChatHistoryDTO } from "../../../application/mappers/chat/mapToGetChatHistoryDTO";

export class ChatController {
    constructor (
        private readonly _getChatHistoryUseCase: IGetChatHistoryUseCase,
        private readonly _generateAnswerUseCase: IGenerateAnswerUseCase,
    ) { }

    askQuestion = asyncHandler(async (req: Request, res: Response) => {

        const data = mapToGenerateAnswerDTO(req);

        const answer = await this._generateAnswerUseCase.execute(data);

        return sendSuccess(
            res,
            statusCode.OK,
            aiMessages.success.ANSWER_GENERATED,
            answer
        );
    })

    getChatHistory = asyncHandler(async (req: Request, res: Response) => {

        const data = mapToGetChatHistoryDTO(req);

        const history = await this._getChatHistoryUseCase.execute(data);

        return sendSuccess(
            res,
            statusCode.OK,
            aiMessages.success.CHAT_FETCHED,
            history
        );
    })
}