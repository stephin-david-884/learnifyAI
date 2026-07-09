export function parseGroqJson<T>(content: string): T {
    const cleaned = content
        .replace(/```json\s*/gi, "")
        .replace(/```\s*/g, "")
        .trim();

    return JSON.parse(cleaned) as T;
}