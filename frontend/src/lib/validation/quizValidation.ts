export const validateQuizGeneration = (
    title: string,
    topics: string[],
    questionCount: number
): string | null => {

    if (!title.trim()) {
        return "Quiz title is required";
    }

    if (topics.length === 0) {
        return "Select at least one topic";
    }

    const maxTopicsMap: Record<number, number> = {
        7: 3,
        10: 5,
        12: 6,
        15: 8,
    };

    const maxTopics =
        maxTopicsMap[questionCount];

    if (topics.length > maxTopics) {
        return `Maximum ${maxTopics} topics allowed for ${questionCount} questions`;
    }

    return null;
};