import { GoogleGenerativeAI } from "@google/generative-ai";
import { IAIService } from "../../../application/interfaces/services/ai/IAIService";
import { ChatMessage } from "../../../domain/entities/Chat.entity";

export class GeminiAIService implements IAIService {

    private readonly _model;

    constructor() {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

        this._model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })
    }


    async rewriteQuestion(question: string, history: ChatMessage[]): Promise<string> {

        if (history.length === 0) {
            return question;
        }

        const historyText = history.map((message) => `${message.role}: ${message.content}`).join("\n");

        const prompt = `
            You are a query rewriting assistant.

                Your task is to convert the user's latest question into a standalone question.

                CHAT HISTORY:
                ${historyText}

                CURRENT QUESTION:
                ${question}

                Rules:

                1. If the current question depends on previous conversation,
                rewrite it into a complete standalone question.

                2. If the current question is already understandable on its own,
                return it unchanged.

                3. Do not answer the question.

                4. Do not explain your reasoning.

                5. Return ONLY the rewritten question.
        `;

        const result = await this._model.generateContent(prompt);

        return result.response.text().trim();
    }

    async generateAnswer(question: string, context: string): Promise<string> {

        const prompt = `
        You are LearnifyAI,
        an AI study assistant helping students understand their documents.

        Use ONLY the provided context.
        Rules:

        1. Answer only from the provided context.
        2. If the answer is not present in the context, reply:
        "I could not find that information in the document."
        3. Explain concepts clearly and simply.
        4. Use bullet points when useful.
        5. If the context supports it, provide examples.
        6. Keep answers educational and concise.

        ------------------------
        CONTEXT
        ------------------------

        ${context}

        ------------------------
        QUESTION
        ------------------------

        ${question}
        `;

        const result = await this._model.generateContent(prompt);

        const response = result.response.text();

        return response;

    }

}