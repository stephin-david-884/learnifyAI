export interface GenerateQuizDTO {
    userId: string;

    documentId: string;

    title?: string;

    topics: string[];

    questionCount: number;
}