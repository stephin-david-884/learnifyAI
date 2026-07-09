export type InterviewQuestionCount =
    | 5
    | 10;

export interface GenerateInterviewDTO {
    userId: string;
    documentId: string;
    title?: string;
    topics:string[];
    questionCount: InterviewQuestionCount;
}