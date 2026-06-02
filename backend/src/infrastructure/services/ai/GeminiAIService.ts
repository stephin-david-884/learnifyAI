import { GoogleGenerativeAI } from "@google/generative-ai";
import { IAIService } from "../../../application/interfaces/services/ai/IAIService";

export class GeminiAIService implements IAIService {

    private readonly _model;

    constructor() {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

        this._model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })
    }

    async generateAnswer(question: string, context: string): Promise<string> {

        const prompt = `
        You are an AI study assistant.
        Answer ONLY using the provided context.

        If the answer is not present in the context,
        say:

        "I could not find that information in the document."

        --------------------
        CONTEXT
        --------------------

        ${context}

        --------------------
        QUESTION
        --------------------

        ${question}
        `;

        const result = await this._model.generateContent(prompt);

        const response = result.response.text();

        return response;

    }

}