import Groq from "groq-sdk";
import { IQuizGenerationService } from "../../../application/interfaces/services/ai/IQuizGenerationService";
import { QuizQuestion } from "../../../domain/entities/Quiz.entity";

export class GroqQuizGenerationService implements IQuizGenerationService {

    private readonly _client;

    constructor() {
        this._client = new Groq({
            apiKey: process.env.GROQ_API_KEY,
        });
    }

    async generateQuiz(context: string, topics: string[], questionCount: number): Promise<QuizQuestion[]> {

        const prompt = `
            You are an educational quiz generator.

            Generate exactly ${questionCount} multiple-choice questions.

            Topics:
            ${topics.join(", ")}

            Rules:

            - Use ONLY the provided context.
            - Questions must cover multiple selected topics.
            - Avoid duplicate questions.
            - Avoid duplicate answer options.
            - Each question must have exactly 4 options.
            - Exactly one option must be correct.
            - Provide explanation.
            - Assign difficulty:
            EASY
            MEDIUM
            HARD

            Return ONLY valid JSON.

            Format:

            [
            {
                "question": "...",
                "options": [
                "...",
                "...",
                "...",
                "..."
                ],
                "correctAnswer": "...",
                "explanation": "...",
                "difficulty": "MEDIUM"
            }
            ]

            Context:

            ${context}
        `;

        const completion = await this._client.chat.completions.create({
            model: "llama-3.3-70b-versatile",

            temperature: 0.3,

            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        const raw = completion.choices[0]?.message?.content ?? "[]";

        const cleaned = raw
            .replace(/```json\s*/gi, "")
            .replace(/```\s*/g, "")
            .trim();

        const parsed = JSON.parse(cleaned);

        if (!Array.isArray(parsed)) {
            throw new Error("Invalid quiz response format");
        }

        return parsed.filter(
            (
                question
            ): question is QuizQuestion => {

                const difficulty =
                    question?.difficulty;

                const validDifficulty =
                    difficulty === "EASY" ||
                    difficulty === "MEDIUM" ||
                    difficulty === "HARD";

                return (
                    typeof question?.question === "string" &&
                    Array.isArray(question?.options) &&
                    question.options.length === 4 &&
                    typeof question?.correctAnswer === "string" &&
                    typeof question?.explanation === "string" &&
                    validDifficulty
                );
            }
        );
    }
}