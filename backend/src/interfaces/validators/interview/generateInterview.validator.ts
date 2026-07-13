import { z } from "zod";

export const generateInterviewSchema = z.object({

    title:
        z.string()
            .trim()
            .min(3)
            .max(100)
            .optional(),

    topics:
        z.array(
            z.string().trim()
        )
            .min(2)
            .max(5),

    questionCount:
        z.union([
            z.literal(5),
            z.literal(10),
        ]),
});