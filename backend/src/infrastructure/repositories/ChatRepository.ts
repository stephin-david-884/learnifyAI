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
                                .findOne({ userId,documentId}).lean();

        return chat ? this._toDomain(chat) : null;                                
        }
    }