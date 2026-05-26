import { z } from "zod";

export const uploadDocumentSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "Title is required")
        .max(100, "Title is too long"),
})

export const getUserDocumentsQuerySchema =
    z.object({
        page: z.coerce.number().min(1).optional(),

        limit: z.coerce.number().min(1).max(50).optional(),

        search: z.string().optional(),

        status: z.enum([
            "UPLOADING",
            "PROCESSING",
            "READY",
            "FAILED",
        ]).optional(),

        sortBy: z.enum([
            "createdAt",
            "title",
        ]).optional(),

        sortOrder: z.enum([
            "asc",
            "desc",
        ]).optional(),
    });

export const documentIdParamSchema =
    z.object({
        documentId: z
            .string()
            .trim()
            .min(1, "Document ID is required"),
    });    