export const buildFlashcardPrompt = (
    context: string,
    topic: string,
    cardCount: number
): string => {

    return `
        You are an expert educational flashcard generator.

        Generate exactly ${cardCount} flashcards.

        Topic:
        ${topic}

        Rules:

        - Use ONLY the supplied context.
        - Cover only the requested topic.
        - Do not invent facts.
        - Questions should test understanding, not memorization.
        - Answers should be concise.
        - Avoid duplicate questions.
        - Assign one difficulty:
        EASY
        MEDIUM
        HARD

        Return ONLY valid JSON.

        Format:

        [
        {
            "question":"...",
            "answer":"...",
            "difficulty":"MEDIUM"
        }
        ]

        Context:

        ${context}
    `
}