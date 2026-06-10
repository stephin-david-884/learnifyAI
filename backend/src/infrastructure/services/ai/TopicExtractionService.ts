import { GoogleGenerativeAI } from "@google/generative-ai";
import { ITopicExtractionService } from "../../../application/interfaces/services/ai/ITopicExtractionService";
import { logError } from "../log/logger";

export class TopicExtractionService implements ITopicExtractionService {
    private readonly _model;

    constructor() {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

        this._model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
        });

    }

    async extractTopics(content: string): Promise<string[]> {

        const prompt = `
        You are an educational content analyzer.

        Identify the most important learning topics from the content.

        Rules:

        - Return between 5 and 15 topics.
        - Topics should be concise.
        - Avoid duplicates.
        - Prefer concepts, chapters, frameworks and methodologies.
        - Return ONLY a valid JSON array.

        Example:

        [
        "Object Oriented Programming",
        "Abstraction",
        "Encapsulation",
        "Inheritance"
        ]

        CONTENT:

        ${content}
        `;

        const result = await this._model.generateContent(prompt);

        const response = result.response.text();

        try {
            const cleaned = response
                .replace(/```json\s*/gi, "")
                .replace(/```\s*/g, "")
                .trim();

            return JSON.parse(cleaned);
        } catch (error) {
            return [];
            logError(error);
        }
    }
}