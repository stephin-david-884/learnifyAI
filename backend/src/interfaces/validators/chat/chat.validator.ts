import { z } from "zod";

export const generateAnswerSchema  =
    z.object({

        documentId: z
            .string()
            .min(1),

        question: z
            .string()
            .trim()
            .min(2)
            .max(2000),
    });