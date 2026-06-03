import { Chat } from "../entities/Chat.entity";
import { IBaseRepository } from "./IBaseRepository";

export interface IChatRepository extends IBaseRepository<Chat> {

    findByUserAndDocument(userId: string, documentId: string): Promise<Chat | null>;

    getMessages(
        userId: string,
        documentId: string,
        page: number,
        limit: number
    ): Promise<{
        messages: Chat["messages"];
        totalMessages: number;
        hasMore: boolean;
    }>;
}