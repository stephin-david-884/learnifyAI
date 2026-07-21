import { Groq } from "groq-sdk/client.js";
import { IFlashcardGenerationService } from "../../../application/interfaces/services/ai/IFlashcardGenerationService";
import { Flashcard } from "../../../domain/entities/Flashcard.entity";
import { buildFlashcardPrompt } from "../../../application/prompts/flashcard/buildFlashcardPrompt";
import { parseFlashcardResponse } from "../../../application/parsers/flashcard/parseFlashcardResponse";

export class GroqFlashcardGenerationService implements IFlashcardGenerationService {

    private readonly _client;

    constructor() {
        this._client = new Groq({
            apiKey: process.env.GROQ_API_KEY,
        });
    }

    async generateFlashcards(context: string, topic: string, cardCount: number): Promise<Flashcard[]> {

        const prompt = buildFlashcardPrompt(context, topic, cardCount);

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

        return parseFlashcardResponse(raw);
    }
}