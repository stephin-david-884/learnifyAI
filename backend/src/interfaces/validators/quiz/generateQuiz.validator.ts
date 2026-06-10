import { z } from "zod";

export const generateQuizSchema =
    z.object({

        documentId:
            z.string().min(1),

        topics:
            z.array(
                z.string()
            )
            .min(1)
            .max(5),

        questionCount:
            z.number()
            .min(7)
            .max(15),

        title:
            z.string()
            .optional(),
    });