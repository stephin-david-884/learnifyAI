import { Groq } from "groq-sdk/client.js";
import { IInterviewGenerationService } from "../../../application/interfaces/services/ai/IInterviewGenerationService";
import { InterviewQuestion } from "../../../domain/entities/Interview.entity";

export class GroqInterviewGenerationService implements IInterviewGenerationService {

    private readonly _client;

    constructor() {
        this._client = new Groq({
            apiKey: process.env.GROQ_API_KEY,
        });
    }

    async generateInterview(context: string, topics: string[], questionCount: number): Promise<InterviewQuestion[]> {

        const prompt = `

            You are a Senior Technical Interviewer.

            Your task is to generate exactly ${questionCount} interview questions.

            Topics:

            ${topics.join(", ")}

            Rules:

            - Use ONLY the supplied context.
            - Questions should test conceptual understanding.
            - Avoid memorization questions.
            - Avoid asking definitions only.
            - Questions should encourage explanation.
            - Every question should be unique.
            - Cover multiple selected topics.
            - Difficulty should gradually increase.
            - No coding questions.
            - No MCQs.
            - No True/False.
            - Questions must be answerable verbally.

            Assign one difficulty:

            EASY
            MEDIUM
            HARD

            Return ONLY valid JSON.

            Format:

            [
            {
            "question":"...",
            "difficulty":"EASY"
            }
            ]

            Context:

            ${context}

            `;

        const completion = await this._client.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            temperature: 0.4,
            messages: [
                {
                    role: "user",
                    content: prompt
                },
            ],
        });

        const raw = completion.choices[0]?.message?.content ?? "[]";

        const cleaned = raw.replace(/```json\s*/gi, "")
                           .replace(/```\s*/g, "") 
                           .trim();

        const parsed = JSON.parse(cleaned);
        
        if (!Array.isArray(parsed)) {
            throw new Error(
                "Invalid interview response"
            );
        }

        return parsed.filter(
            (
                question
            ): question is InterviewQuestion => {

                const difficulty =
                    question?.difficulty;

                const validDifficulty =
                    difficulty === "EASY" ||
                    difficulty === "MEDIUM" ||
                    difficulty === "HARD";

                return (
                    typeof question?.question === "string" && validDifficulty
                );
            }
        );
    }
}