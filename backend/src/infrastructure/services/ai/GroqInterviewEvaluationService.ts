import { Groq } from "groq-sdk/client.js";
import { IInterviewEvaluationService } from "../../../application/interfaces/services/ai/IInterviewEvaluationService";
import { InterviewAnswer } from "../../../domain/entities/Interview.entity";

export class GroqInterviewEvaluationService implements IInterviewEvaluationService {

    private readonly _client;

    constructor() {
        this._client = new Groq({
            apiKey: process.env.GROQ_API_KEY,
        })
    }

    async evaluateInterview(answers: InterviewAnswer[]): Promise<InterviewAnswer[]> {
        const prompt = `

            You are a Senior Technical Interviewer.

            Evaluate the candidate's answers using a rubric.

            Do NOT compare exact wording.

            Instead evaluate:

            - Conceptual understanding
            - Technical accuracy
            - Completeness
            - Clarity
            - Communication

            Score each answer from 0 to 10.

            Rules:

            - Give constructive feedback.
            - Mention strengths.
            - Mention improvements.
            - Never punish wording differences.
            - Reward correct concepts.
            - Feedback should be 2-3 sentences.
            - Improvements should be practical.

            Return ONLY valid JSON.

            Format:

            [
            {
            "questionIndex":0,
            "score":8,
            "feedback":"...",
            "strengths":[
            "...",
            "..."
            ],
            "improvements":[
            "...",
            "..."
            ]
            }
            ]

            Candidate Answers:

            ${JSON.stringify(answers, null, 2)}

            `;

        const completion = await this._client.chat.completions.create({
            model: "llama-3.3-70b-versatile",

            temperature: 0.2,

            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        const raw = completion.choices[0]?.message?.content ?? "[]";

        const cleaned =
            raw
                .replace(/```json\s*/gi, "")
                .replace(/```\s*/g, "")
                .trim();

        const parsed =
            JSON.parse(cleaned);

        if (!Array.isArray(parsed)) {

            throw new Error(
                "Invalid evaluation response"
            );
        }

        return answers.map((answer) => {

            const evaluation =
                parsed.find(
                    (
                        item
                    ) =>
                        item.questionIndex ===
                        answer.questionIndex
                );

            return {

                ...answer,

                score:
                    evaluation?.score ?? 0,

                feedback:
                    evaluation?.feedback ??
                    "",

                strengths:
                    evaluation?.strengths ?? [],

                improvements:
                    evaluation?.improvements ?? [],
            };
        });
    }
}