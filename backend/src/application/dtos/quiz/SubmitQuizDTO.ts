export interface SubmitQuizAnswerDTO {
    questionIndex: number;

    selectedAnswer: string;
}

export interface SubmitQuizDTO {
    userId: string;

    quizId: string;

    answers: SubmitQuizAnswerDTO[];
}