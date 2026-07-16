export type FlashcardDifficulty =
    | "EASY"
    | "MEDIUM"
    | "HARD";

type FlashcardProps = {
    question: string;
    answer: string;
    difficulty?: FlashcardDifficulty;
};

export class Flashcard {

    public question: string;
    public answer: string;
    public difficulty: FlashcardDifficulty;

    constructor(props: FlashcardProps) {

        this.question = props.question.trim();

        this.answer = props.answer.trim();

        this.difficulty = props.difficulty ?? "MEDIUM";

        this.validate();
    }

    private validate() {

        if (!this.question) {
            throw new Error("Flashcard question is required");
        }

        if (!this.answer) {
            throw new Error("Flashcard answer is required");
        }
    }
}