import { Flashcard } from "./Flashcard.entity";

type FlashcardSetProps = {

    id?: string;
    userId: string;
    documentId: string;
    topic: string;
    cardCount: number;
    creditsUsed: number;
    cards: Flashcard[];
    createdAt?: Date;
    updatedAt?: Date;
};

export class FlashcardSet {

    public readonly id?: string;

    public userId: string;

    public documentId: string;

    public topic: string;

    public cardCount: number;

    public creditsUsed: number;

    public cards: Flashcard[];

    public readonly createdAt?: Date;

    public readonly updatedAt?: Date;

    constructor(props: FlashcardSetProps) {

        this.id = props.id;

        this.userId = props.userId;

        this.documentId = props.documentId;

        this.topic = props.topic;

        this.cardCount = props.cardCount;

        this.creditsUsed = props.creditsUsed;

        this.cards = props.cards;

        this.createdAt = props.createdAt;

        this.updatedAt = props.updatedAt;

        this.validate();
    }

    private validate() {

        if (!this.topic.trim()) {
            throw new Error("Topic is required");
        }

        if (this.cardCount <= 0) {
            throw new Error("Card count must be greater than zero");
        }

        if (this.cards.length !== this.cardCount) {
            throw new Error("Card count does not match generated cards");
        }

        if (this.creditsUsed <= 0) {
            throw new Error("Credits used must be greater than zero");
        }
    }

    getId(): string {

        if (!this.id) {
            throw new Error(
                "Flashcard Set ID is not set"
            );
        }

        return this.id;
    }
}