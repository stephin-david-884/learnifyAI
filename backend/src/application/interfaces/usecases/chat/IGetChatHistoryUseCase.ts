import { GetChatHistoryDTO } from "../../../dtos/chat/GetChatHistoryDTO";

export interface IGetChatHistoryUseCase {

    execute(data: GetChatHistoryDTO): Promise<{
        messages: {
            role: string;
            content: string;
            createdAt: Date;
        }[];

        totalMessages: number;

        hasMore: boolean;
    }>;
}