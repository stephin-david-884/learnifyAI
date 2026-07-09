export interface InterviewAnswerReviewDTO {

    question: string;

    transcript: string;

    score: number;

    feedback: string;

    strengths: string[];

    improvements: string[];
}

export interface GetInterviewResultResponseDTO {

    interviewId: string;

    overallScore: number;

    totalQuestions: number;

    review: InterviewAnswerReviewDTO[];
}