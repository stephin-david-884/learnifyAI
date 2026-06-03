export interface ChatMessage {
    role: "USER" | "ASSISTANT";
    content: string;
    createdAt: string;
}

export interface Chat {
    id: string;
    userId: string;
    documentId: string;
    title: string;
    messages: ChatMessage[];
    createdAt: string;
    updatedAt: string;
}

export interface ChatHistoryResponse {
    messages: ChatMessage[];
    page: number;
    limit: number;
    totalMessages: number;
    hasMore: boolean;
}

export interface GenerateAnswerPayload {
    documentId: string;
    question: string;
}

export interface GenerateAnswerResponse {
    answer: string;

    sources: {
        chunkId: string;
        pageNumber: number;
    }[];
}

export interface ChatState {
    messages: ChatMessage[];

    loading: boolean;
    sending: boolean;

    page: number;
    limit: number;

    hasMore: boolean;

    error: string | null;
}