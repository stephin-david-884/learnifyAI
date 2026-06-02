import { Chat } from "../../../domain/entities/Chat.entity";
import { IChatRepository } from "../../../domain/repositories/IChatRepository";
import { SaveChatHistoryDTO } from "../../dtos/chat/SaveChatHistoryDTO";
import { ISaveChatHistoryUseCase } from "../../interfaces/usecases/chat/ISaveChatHistoryUseCase";

export class SaveChatHistoryUseCase implements ISaveChatHistoryUseCase {

    constructor(
        private readonly _chatRepository: IChatRepository
    ) { }

    async execute(data: SaveChatHistoryDTO): Promise<void> {

        const existingChat = await this._chatRepository.findByUserAndDocument(
            data.userId,
            data.documentId
        );

        if (existingChat) {
            existingChat.addMessages(data.messages.map((message) => ({
                role: message.role,
                content: message.content,
                createdAt: new Date(),
            })));

            await this._chatRepository.save(existingChat);

            return;
        }

        const chat = new Chat({
            userId: data.userId,
            documentId: data.documentId,
            title: data.title ?? "New chat",

            messages: data.messages.map((message) => ({
                role: message.role,
                content: message.content,
                createdAt: new Date(),
            }))
        });

        await this._chatRepository.save(chat);
    }
}