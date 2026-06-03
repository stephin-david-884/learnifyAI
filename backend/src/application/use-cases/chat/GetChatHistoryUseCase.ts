import { IChatRepository } from "../../../domain/repositories/IChatRepository";
import { GetChatHistoryDTO } from "../../dtos/chat/GetChatHistoryDTO";
import { IGetChatHistoryUseCase } from "../../interfaces/usecases/chat/IGetChatHistoryUseCase";

export class GetChatHistoryUseCase implements IGetChatHistoryUseCase {

    constructor(
        private readonly _chatRepository: IChatRepository
    ) { }

    async execute(data: GetChatHistoryDTO): Promise<{
        messages: {
            role: string;
            content: string;
            createdAt: Date;
        }[];

        totalMessages: number;
        page: number;
        limit: number;
        hasMore: boolean;
    }> {
        const result = await this._chatRepository.getMessages(
            data.userId,
            data.documentId,
            data.page,
            data.limit
        );

        return {
            ...result,
            page: data.page,
            limit: data.limit
        }
    }
}