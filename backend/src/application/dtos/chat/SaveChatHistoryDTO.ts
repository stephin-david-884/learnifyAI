import { ChatRole } from "../../../domain/entities/Chat.entity";

export interface SaveChatMessageDTO {
    role: ChatRole;
    content: string;
}

export interface SaveChatHistoryDTO {
    userId: string;
    documentId: string;
    title?: string;
    messages: SaveChatMessageDTO[];
}