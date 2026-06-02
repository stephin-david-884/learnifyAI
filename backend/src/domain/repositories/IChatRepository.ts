import { Chat } from "../entities/Chat.entity";
import { IBaseRepository } from "./IBaseRepository";

export interface IChatRepository extends IBaseRepository<Chat> {

    findByUserAndDocument(userId: string, documentId: string): Promise<Chat | null>;
}