export type ChatRole =
    | "USER"
    | "ASSISTANT";

export interface ChatMessageItem {
    role: ChatRole;
    content: string;
    createdAt: string;
}

export interface ChatHistoryResponse {
    messages: ChatMessageItem[];

    totalMessages: number;

    hasMore: boolean;

    page: number;

    limit: number;
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
    messages: ChatMessageItem[];

    loading: boolean;
    sending: boolean;

    page: number;
    limit: number;

    hasMore: boolean;

    error: string | null;
}

export interface Chat {
    id: string;
    userId: string;
    documentId: string;
    title: string;
    messages: ChatMessageItem[];
    createdAt: string;
    updatedAt: string;
}