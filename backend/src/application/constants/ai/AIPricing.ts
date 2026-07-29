import { AIProvider } from "../../../domain/entities/AIUsageEvent.entity";

export interface AIModelPricing {

    /* USD per 1 million input tokens.*/
    inputPerMillionTokens: number;

    /* USD per 1 million output tokens.*/
    outputPerMillionTokens: number;
}

export const AI_PRICING: Record<
    AIProvider,
    Record<string, AIModelPricing>
> = {

    GEMINI: {

        "gemini-2.5-flash": {
            inputPerMillionTokens: 0.30,
            outputPerMillionTokens: 2.50,
        },

        "text-embedding-004": {
            inputPerMillionTokens: 0.15,
            outputPerMillionTokens: 0,
        },

    },

    GROQ: {

        "llama-3.3-70b-versatile": {
            inputPerMillionTokens: 0.59,
            outputPerMillionTokens: 0.79,
        },

    },

    OPENAI: {},

    CLAUDE: {},

    AZURE_OPENAI: {},

    MISTRAL: {},

};