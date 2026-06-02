export interface GenerateAnswerDTO {
    userId: string;
    documentId: string;
    question: string;
}

export interface GenerateAnswerResponseDTO {
    answer: string;

    sources: {
        chunkId: string;
        pageNumber?: number;
    }[]
}