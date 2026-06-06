import { ChatMessage } from "../../../../domain/entities/Chat.entity";

export interface IAIService {

    rewriteQuestion(question: string, history: ChatMessage[]): Promise<string>;

    generateAnswer(question: string, context:string): Promise<string>;
}