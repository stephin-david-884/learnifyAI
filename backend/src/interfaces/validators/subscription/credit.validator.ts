import z from "zod";

export const consumeCreditsSchema = z.object({
    amount: z
        .number()
        .int("Credits must be an integer")
        .positive("Credits must be greater than 0"),
});