import { Chat } from "../../../../domain/entities/Chat.entity";
import { GetChatHistoryDTO } from "../../../dtos/chat/GetChatHistoryDTO";

export interface IGetChatHistoryUseCase {

    execute(data: GetChatHistoryDTO): Promise<Chat | null>;
}