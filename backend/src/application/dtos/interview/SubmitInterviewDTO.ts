export interface SubmitInterviewAnswerDTO {

    questionIndex: number;

    transcript: string;
}

export interface SubmitInterviewDTO {

    userId: string;

    interviewId: string;

    answers: SubmitInterviewAnswerDTO[];
}