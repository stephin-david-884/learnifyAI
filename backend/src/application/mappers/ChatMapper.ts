import { Types } from "mongoose";
import { Chat } from "../../domain/entities/Chat.entity";
import { ChatLean } from "../../infrastructure/database/models/Chat";

export const toDomainChat = (dbChat: ChatLean): Chat => {

    return new Chat({
        id: dbChat._id.toString(),

        userId: dbChat.userId.toString(),

        documentId: dbChat.documentId.toString(),

        title: dbChat.title,

        messages: dbChat.messages.map(
            (message) => ({
                role: message.role,
                content: message.content,
                createdAt: message.createdAt,
            })
        ),

        createdAt: dbChat.createdAt,
        updatedAt: dbChat.updatedAt,
    });
};

export const toPersistenceChat = (chat: Chat) => {

    return {

        userId: new Types.ObjectId(chat.userId),

        documentId: new Types.ObjectId(chat.documentId),

        title: chat.title,

        messages: chat.messages.map(
            (message) => ({
                role: message.role,
                content: message.content,
                createdAt: message.createdAt,
            })
        ),
    };
}