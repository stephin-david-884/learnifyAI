import { Flashcard } from "../../../domain/entities/Flashcard.entity";

export const parseFlashcardResponse = (
    raw: string
): Flashcard[] => {

    const cleaned = raw.replace(/```json\s*/gi, "")
        .replace(/```\s*/g, "")
        .trim();

    const parsed = JSON.parse(cleaned);

    if (!Array.isArray(parsed)) {
        throw new Error("Invalid flashcard response");
    }

    return parsed
        .filter(card => {

            const validDifficulty =
                card?.difficulty === "EASY" ||
                card?.difficulty === "MEDIUM" ||
                card?.difficulty === "HARD";

            return (
                typeof card?.question === "string" &&
                typeof card?.answer === "string" &&
                validDifficulty
            );
        })
        .map(card =>
            new Flashcard({
                question: card.question,
                answer: card.answer,
                difficulty: card.difficulty,
            })
        );
}