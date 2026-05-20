import { z } from "zod";

export const getAllSubscriptionPlansSchema =
    z.object({

        page: z.coerce.number()
            .min(1)
            .optional(),
        limit: z.coerce.number()
            .min(1)
            .max(100)
            .optional(),
        search: z.string()
            .optional(),
        status: z.enum(["ACTIVE", "EXPIRED", "CANCELLED"])
            .optional(),
        billingCycle: z.enum(["MONTHLY", "YEARLY",])
            .optional(),
        sortBy: z.enum(["createdAt", "price", "name",])
            .optional(),
        sortOrder: z.enum(["asc", "desc",])
            .optional(),
    });