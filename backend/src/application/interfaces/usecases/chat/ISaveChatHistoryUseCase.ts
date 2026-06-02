import { SaveChatHistoryDTO } from "../../../dtos/chat/SaveChatHistoryDTO";

export interface ISaveChatHistoryUseCase  {

    execute(data: SaveChatHistoryDTO): Promise<void>;
}