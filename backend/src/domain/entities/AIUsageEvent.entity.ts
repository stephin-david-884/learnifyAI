export type AIProvider =
    | "GEMINI"
    | "GROQ"
    | "OPENAI"
    | "CLAUDE"
    | "AZURE_OPENAI"
    | "MISTRAL";

export type AIUsageFeature =
    | "DOCUMENT_EMBEDDING"
    | "VISUAL_EMBEDDING"
    | "TOPIC_EXTRACTION"
    | "FLASHCARD_GENERATION"
    | "QUIZ_GENERATION"
    | "INTERVIEW_GENERATION"
    | "INTERVIEW_EVALUATION"
    | "CHAT"
    | "DOCUMENT_SEARCH";

export type AIUsageStatus =
    | "SUCCESS"
    | "FAILED";

export interface AIUsageMetadata {
    [key: string]: string | number | boolean | null;
}

type AIUsageEventProps = {
    id?: string;

    provider: AIProvider;

    feature: AIUsageFeature;

    model: string;

    userId?: string;

    documentId?: string;

    requestTokens?: number;

    responseTokens?: number;

    totalTokens?: number;

    estimatedCost?: number;

    latencyMs: number;

    status?: AIUsageStatus;

    error?: string;

    metadata?: AIUsageMetadata;

    createdAt?: Date;
};

export class AIUsageEvent {

    public readonly id?: string;

    public readonly provider: AIProvider;

    public readonly feature: AIUsageFeature;

    public readonly model: string;

    public readonly userId?: string;

    public readonly documentId?: string;

    public readonly requestTokens?: number;

    public readonly responseTokens?: number;

    public readonly totalTokens?: number;

    public estimatedCost: number;

    public readonly latencyMs: number;

    public status: AIUsageStatus;

    public error?: string;

    public metadata: AIUsageMetadata;

    public readonly createdAt: Date;

    constructor(props: AIUsageEventProps) {

        this.id = props.id;

        this.provider = props.provider;

        this.feature = props.feature;

        this.model = props.model;

        this.userId = props.userId;

        this.documentId = props.documentId;

        this.requestTokens = props.requestTokens;

        this.responseTokens = props.responseTokens;

        this.totalTokens = props.totalTokens;

        this.estimatedCost = props.estimatedCost ?? 0;

        this.latencyMs = props.latencyMs;

        this.status = props.status ?? "SUCCESS";

        this.error = props.error;

        this.metadata = props.metadata ?? {};

        this.createdAt = props.createdAt ?? new Date();
    }

    markFailed(error: string): void {

        this.status = "FAILED";

        this.error = error.trim();
    }

    markSuccessful(): void {

        this.status = "SUCCESS";

        this.error = undefined;
    }

    setEstimatedCost(cost: number): void {

        if (cost < 0) {

            throw new Error("Estimated cost cannot be negative.");
        }

        this.estimatedCost = cost;
    }

    getId(): string {

        if (!this.id) {

            throw new Error("AI Usage Event ID is not set.");
        }

        return this.id;
    }

    hasUser(): boolean {

        return !!this.userId;
    }

    hasDocument(): boolean {

        return !!this.documentId;
    }

    hasTokenUsage(): boolean {

        return (
            this.requestTokens !== undefined ||
            this.responseTokens !== undefined ||
            this.totalTokens !== undefined
        );
    }

    addMetadata(
        key: string,
        value: string | number | boolean | null
    ): void {

        this.metadata[key] = value;
    }

    getMetadata(
        key: string
    ): string | number | boolean | null | undefined {

        return this.metadata[key];
    }
}