import { Chat } from "../../../domain/entities/Chat.entity";
import { IChatRepository } from "../../../domain/repositories/IChatRepository";
import { GetChatHistoryDTO } from "../../dtos/chat/GetChatHistoryDTO";
import { IGetChatHistoryUseCase } from "../../interfaces/usecases/chat/IGetChatHistoryUseCase";

export class GetChatHistoryUseCase implements IGetChatHistoryUseCase {

    constructor(
        private readonly _chatRepository: IChatRepository
    ) {}

    async execute(data: GetChatHistoryDTO): Promise<Chat | null> {
        
        return await this._chatRepository.findByUserAndDocument(data.userId, data.documentId);
    }
}