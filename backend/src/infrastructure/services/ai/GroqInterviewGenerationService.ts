import { Groq } from "groq-sdk/client.js";
import { IInterviewGenerationService } from "../../../application/interfaces/services/ai/IInterviewGenerationService";
import { InterviewQuestion } from "../../../domain/entities/Interview.entity";
import { IAIUsageRecorder } from "../../../application/interfaces/services/analytics/IAIUsageRecorder";

export class GroqInterviewGenerationService implements IInterviewGenerationService {

    private readonly _client;

    constructor(
        private readonly _usageRecorder: IAIUsageRecorder,
    ) {
        this._client = new Groq({
            apiKey: process.env.GROQ_API_KEY,
        });
    }

    async generateInterview(context: string, topics: string[], questionCount: number): Promise<InterviewQuestion[]> {

        return this._usageRecorder.record(

            {
                provider: "GROQ",

                feature: "INTERVIEW_GENERATION",

                aiModel: "llama-3.3-70b-versatile",

                metadata: {
                    topics: topics.join(", "),
                    requestedQuestions: questionCount,
                },
            },

            async () => {

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

                const completion =
                    await this._client.chat.completions.create({

                        model: "llama-3.3-70b-versatile",

                        temperature: 0.4,

                        messages: [
                            {
                                role: "user",
                                content: prompt,
                            },
                        ],

                    });

                const raw =
                    completion.choices[0]?.message?.content ?? "[]";

                const cleaned = raw
                    .replace(/```json\s*/gi, "")
                    .replace(/```\s*/g, "")
                    .trim();

                const parsed = JSON.parse(cleaned);

                if (!Array.isArray(parsed)) {
                    throw new Error(
                        "Invalid interview response"
                    );
                }

                const questions = parsed.filter(
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
                            typeof question?.question === "string" &&
                            validDifficulty
                        );

                    }
                );

                return {

                    result: questions,

                    usage: {

                        requestTokens:
                            completion.usage?.prompt_tokens,

                        responseTokens:
                            completion.usage?.completion_tokens,

                        totalTokens:
                            completion.usage?.total_tokens,

                    },

                };

            }

        );
    }
}