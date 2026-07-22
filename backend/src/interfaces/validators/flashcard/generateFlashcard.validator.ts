import { z } from "zod";

export const generateFlashcardSchema =
    z.object({

        documentId:
            z.string().min(1),

        topic:
            z.string().trim().min(1),

        cardCount:
            z.union([
                z.literal(5),
                z.literal(10),
            ]),
    });