import { Groq } from "groq-sdk/client.js";
import { IFlashcardGenerationService } from "../../../application/interfaces/services/ai/IFlashcardGenerationService";
import { Flashcard } from "../../../domain/entities/Flashcard.entity";
import { buildFlashcardPrompt } from "../../../application/prompts/flashcard/buildFlashcardPrompt";
import { parseFlashcardResponse } from "../../../application/parsers/flashcard/parseFlashcardResponse";
import { IAIUsageRecorder } from "../../../application/interfaces/services/analytics/IAIUsageRecorder";

export class GroqFlashcardGenerationService
    implements IFlashcardGenerationService {

    private readonly _client;

    constructor(
        private readonly _usageRecorder: IAIUsageRecorder,
    ) {
        this._client = new Groq({
            apiKey: process.env.GROQ_API_KEY,
        });
    }

    async generateFlashcards(
        context: string,
        topic: string,
        cardCount: number
    ): Promise<Flashcard[]> {

        return this._usageRecorder.record(

            {
                provider: "GROQ",

                feature: "FLASHCARD_GENERATION",

                aiModel: "openai/gpt-oss-120b",

                metadata: {
                    topic,
                    requestedFlashcards: cardCount,
                },
            },

            async () => {

                const prompt =
                    buildFlashcardPrompt(
                        context,
                        topic,
                        cardCount,
                    );

                const completion =
                    await this._client.chat.completions.create({

                        model: "openai/gpt-oss-120b",

                        temperature: 0.3,

                        messages: [
                            {
                                role: "user",
                                content: prompt,
                            },
                        ],

                    });

                const raw =
                    completion.choices[0]?.message?.content ??
                    "[]";

                const flashcards =
                    parseFlashcardResponse(raw);

                return {

                    result: flashcards,

                    usage: {

                        requestTokens:
                            completion.usage?.prompt_tokens,

                        responseTokens:
                            completion.usage?.completion_tokens,

                        totalTokens:
                            completion.usage?.total_tokens,

                    },

                };

            },

        );
    }
}