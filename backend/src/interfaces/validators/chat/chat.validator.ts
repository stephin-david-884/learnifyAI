import { z } from "zod";

export const askQuestionSchema =
    z.object({

        documentId: z
            .string()
            .min(1),

        question: z
            .string()
            .trim()
            .min(2)
            .max(1000),
    });