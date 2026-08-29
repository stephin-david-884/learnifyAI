import Groq from "groq-sdk";
import { IQuizGenerationService } from "../../../application/interfaces/services/ai/IQuizGenerationService";
import {
    QuizQuestion,
} from "../../../domain/entities/Quiz.entity";

export class GroqQuizGenerationService
    implements IQuizGenerationService {

    private readonly _client: Groq;

    constructor() {
        this._client = new Groq({
            apiKey: process.env.GROQ_API_KEY,
        });
    }

    async generateQuiz(
        context: string,
        topics: string[],
        questionCount: number
    ): Promise<QuizQuestion[]> {

        const prompt = `
            Generate exactly ${questionCount} multiple-choice questions
            based ONLY on the provided context.

            Selected topics:
            ${topics.join(", ")}

            Rules:

            - Use ONLY information present in the provided context.
            - Questions should cover the selected topics.
            - Avoid duplicate questions.
            - Avoid duplicate answer options.
            - Each question must have exactly 4 answer options.
            - Exactly one option must be correct.
            - The correctAnswer must exactly match one of the options.
            - Provide a clear explanation for the correct answer.
            - Assign one difficulty level:
              EASY
              MEDIUM
              HARD

            Generate exactly ${questionCount} questions.

            Context:
            ${context}
        `;

        const completion =
            await this._client.chat.completions.create({

                model: "openai/gpt-oss-120b",

                temperature: 0.3,

                messages: [
                    {
                        role: "system",
                        content:
                            "You are an educational quiz generator. Generate accurate multiple-choice questions strictly from the provided context.",
                    },
                    {
                        role: "user",
                        content: prompt,
                    },
                ],

                response_format: {
                    type: "json_schema",
                    json_schema: {
                        name: "quiz_generation",
                        strict: true,

                        schema: {
                            type: "object",

                            properties: {
                                questions: {
                                    type: "array",

                                    items: {
                                        type: "object",

                                        properties: {
                                            question: {
                                                type: "string",
                                            },

                                            options: {
                                                type: "array",

                                                items: {
                                                    type: "string",
                                                },

                                                minItems: 4,
                                                maxItems: 4,
                                            },

                                            correctAnswer: {
                                                type: "string",
                                            },

                                            explanation: {
                                                type: "string",
                                            },

                                            difficulty: {
                                                type: "string",

                                                enum: [
                                                    "EASY",
                                                    "MEDIUM",
                                                    "HARD",
                                                ],
                                            },
                                        },

                                        required: [
                                            "question",
                                            "options",
                                            "correctAnswer",
                                            "explanation",
                                            "difficulty",
                                        ],

                                        additionalProperties: false,
                                    },
                                },
                            },

                            required: [
                                "questions",
                            ],

                            additionalProperties: false,
                        },
                    },
                },
            });

        const raw =
            completion.choices[0]?.message?.content;

        if (!raw) {
            throw new Error(
                "Groq returned an empty quiz response"
            );
        }

        const parsed: {
            questions: QuizQuestion[];
        } = JSON.parse(raw);

        if (!Array.isArray(parsed.questions)) {
            throw new Error(
                "Invalid quiz response format"
            );
        }

        if (parsed.questions.length !== questionCount) {
            throw new Error(
                `Expected ${questionCount} questions but received ${parsed.questions.length}`
            );
        }

        return parsed.questions;
    }
}