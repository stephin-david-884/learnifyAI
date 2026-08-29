import { Groq } from "groq-sdk/client.js";
import { IInterviewGenerationService } from "../../../application/interfaces/services/ai/IInterviewGenerationService";
import { InterviewQuestion } from "../../../domain/entities/Interview.entity";
import { IAIUsageRecorder } from "../../../application/interfaces/services/analytics/IAIUsageRecorder";

export class GroqInterviewGenerationService
    implements IInterviewGenerationService {

    private readonly _client: Groq;

    constructor(
        private readonly _usageRecorder: IAIUsageRecorder,
    ) {
        this._client = new Groq({
            apiKey: process.env.GROQ_API_KEY,
        });
    }

    async generateInterview(
        context: string,
        topics: string[],
        questionCount: number
    ): Promise<InterviewQuestion[]> {

        return this._usageRecorder.record(
            {
                provider: "GROQ",

                feature: "INTERVIEW_GENERATION",

                aiModel: "openai/gpt-oss-120b",

                metadata: {
                    topics: topics.join(", "),
                    requestedQuestions: questionCount,
                },
            },

            async () => {

                const prompt = `
                    Generate exactly ${questionCount}
                    technical interview questions.

                    Topics:
                    ${topics.join(", ")}

                    Rules:

                    - Use ONLY the supplied context.
                    - Questions should test conceptual understanding.
                    - Avoid memorization questions.
                    - Avoid asking definitions only.
                    - Questions should encourage explanation.
                    - Every question must be unique.
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

                    Generate exactly ${questionCount} questions.

                    Context:

                    ${context}
                `;

                const completion =
                    await this._client.chat.completions.create({

                        model: "openai/gpt-oss-120b",

                        temperature: 0.4,

                        messages: [
                            {
                                role: "system",
                                content:
                                    "You are a Senior Technical Interviewer. Generate high-quality verbal technical interview questions strictly from the supplied context.",
                            },
                            {
                                role: "user",
                                content: prompt,
                            },
                        ],

                        response_format: {
                            type: "json_schema",

                            json_schema: {
                                name: "interview_generation",

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
                        "Groq returned an empty interview response"
                    );
                }

                const parsed: {
                    questions: InterviewQuestion[];
                } = JSON.parse(raw);

                if (!Array.isArray(parsed.questions)) {
                    throw new Error(
                        "Invalid interview response format"
                    );
                }

                if (parsed.questions.length !== questionCount) {
                    throw new Error(
                        `Expected ${questionCount} questions but received ${parsed.questions.length}`
                    );
                }

                const questions =
                    parsed.questions.filter(
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
                                question.question.trim().length > 0 &&
                                validDifficulty
                            );
                        }
                    );

                if (questions.length !== questionCount) {
                    throw new Error(
                        "Groq returned invalid interview questions"
                    );
                }

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