import { toDomainChat, toPersistenceChat } from "../../application/mappers/ChatMapper";
import { Chat } from "../../domain/entities/Chat.entity";
import { IChatRepository } from "../../domain/repositories/IChatRepository";
import { ChatLean, ChatModel } from "../database/models/Chat";
import { BaseRepository } from "./BaseRepository";

export class ChatRepository
    extends BaseRepository<Chat, ChatLean>
    implements IChatRepository {

    constructor() {
        super(
            ChatModel,
            toDomainChat,
            toPersistenceChat
        );
    }

    async findByUserAndDocument(userId: string, documentId: string): Promise<Chat | null> {

        const chat = await this._model
            .findOne({ userId, documentId }).lean();

        return chat ? this._toDomain(chat) : null;
    }

    async getMessages(
        userId: string,
        documentId: string,
        page: number,
        limit: number
    ): Promise<{
        messages: Chat["messages"];
        totalMessages: number;
        hasMore: boolean;
    }> {

        const chat = await this._model
            .findOne({
                userId,
                documentId
            })
            .lean();

        if(!chat) {
            return {
                messages: [],
                totalMessages: 0,
                hasMore: false
            }
        }
        
        const totalMessages = chat.messages.length;

        const start = Math.max(totalMessages - page * limit, 0);

        const end = totalMessages - (page-1) * limit;

        const messages = chat.messages.slice(start, end);

        return {
            messages,
            totalMessages,
            hasMore: start > 0
        };
    }
}