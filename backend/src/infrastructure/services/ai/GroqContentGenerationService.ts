import Groq from "groq-sdk";
import { IContentGenerationService } from "../../../application/interfaces/services/ai/IContentGenerationService";
import { DocumentTopic } from "../../../domain/entities/Document.entity";

export class GroqContentGenerationService implements IContentGenerationService {

    private readonly _client;

    constructor() {
        this._client = new Groq({
            apiKey: process.env.GROQ_API_KEY,
        });
    }

    async extractTopics(content: string): Promise<DocumentTopic[]> {

        for (let attempt = 1; attempt <= 3; attempt++) {

            try {
                const completion = await this._client.chat.completions.create({
                    model: "llama-3.3-70b-versatile",
                    messages: [
                        {
                            role: "system",
                            content: `
                            You are an educational content analyzer.

                            Identify the most important learning topics from the content.

                            Rules:
                            - Return between 5 and 15 topics.
                            - Topics should be concise.
                            - Avoid duplicates.
                            - Prefer concepts, chapters, frameworks and methodologies.
                            - Each topic must contain:
                            - name
                            - score
                            - score must be an integer between 1 and 100.
                            - Higher score means the topic is more important in the document.
                            - Return ONLY a valid JSON array.
                            - Do not include explanations.
                            - Do not include markdown.
                            - Do not wrap the JSON in code fences.

                            Example:

                            [
                            {
                                "name": "Object Oriented Programming",
                                "score": 100
                            },
                            {
                                "name": "Abstraction",
                                "score": 95
                            },
                            {
                                "name": "Encapsulation",
                                "score": 92
                            },
                            {
                                "name": "Inheritance",
                                "score": 90
                            }
                            ]
                            `
                        },
                        {
                            role: "user",
                            content,
                        },
                    ],
                    temperature: 0.1,
                });

                const text =
                    completion.choices[0]?.message?.content ?? "[]";

                const cleaned = text
                    .replace(/```json\s*/gi, "")
                    .replace(/```\s*/g, "")
                    .trim();

                const parsed = JSON.parse(cleaned);

                if (!Array.isArray(parsed)) return [];

                return parsed.filter(
                    (topic): topic is DocumentTopic =>
                        typeof topic?.name === "string" &&
                        typeof topic?.score === "number"
                );

            } catch (error) {

                if (attempt === 3) throw error;

                await new Promise(res =>
                    setTimeout(res, attempt * 1000)
                );
            }
        }

        return [];
    }
    // async extractTopics(content: string): Promise<DocumentTopic[]> {

    //     const completion = await this._client.chat.completions.create({
    //         model: "llama-3.3-70b-versatile",

    //         messages: [
    //             {
    //                 role: "system",
    //                 content: `
    //                 You are an educational content analyzer.

    //                 Identify the most important learning topics from the content.

    //                 Rules:
    //                 - Return between 5 and 15 topics.
    //                 - Topics should be concise.
    //                 - Avoid duplicates.
    //                 - Prefer concepts, chapters, frameworks and methodologies.
    //                 - Each topic must contain:
    //                 - name
    //                 - score
    //                 - score must be an integer between 1 and 100.
    //                 - Higher score means the topic is more important in the document.
    //                 - Return ONLY a valid JSON array.
    //                 - Do not include explanations.
    //                 - Do not include markdown.
    //                 - Do not wrap the JSON in code fences.

    //                 Example:

    //                 [
    //                 {
    //                     "name": "Object Oriented Programming",
    //                     "score": 100
    //                 },
    //                 {
    //                     "name": "Abstraction",
    //                     "score": 95
    //                 },
    //                 {
    //                     "name": "Encapsulation",
    //                     "score": 92
    //                 },
    //                 {
    //                     "name": "Inheritance",
    //                     "score": 90
    //                 }
    //                 ]
    //                 `
    //             },

    //             {
    //                 role: "user",
    //                 content,
    //             },
    //         ],

    //         temperature: 0.1,
    //     });

    //     const text = completion.choices[0]?.message?.content ?? "[]";

    //     try {
    //         const cleaned = text
    //             .replace(/```json\s*/gi, "")
    //             .replace(/```\s*/g, "")
    //             .trim();

    //         const parsed = JSON.parse(cleaned);

    //         if (!Array.isArray(parsed)) {
    //             return [];
    //         }

    //         return parsed.filter(
    //             (topic): topic is DocumentTopic =>
    //                 typeof topic?.name === "string" &&
    //                 typeof topic?.score === "number"
    //         );
    //     } catch {
    //         return [];
    //     }
    // }
}