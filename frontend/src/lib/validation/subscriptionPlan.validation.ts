import { z } from "zod";

export const subscriptionPlanSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Plan name must be at least 2 characters")
        .max(50, "Plan name is too long"),

    price: z
        .number()
        .min(1, "Price must be greater than 0"),

    creditsPerMonth: z
        .number()
        .min(1, "Credits must be at least 1"),

    discount: z
        .number()
        .min(0, "Discount cannot be negative")
        .max(95, "Discount cannot exceed 95"),

    billingCycle: z.enum([
        "MONTHLY",
        "YEARLY",
    ]),

    durationInDays: z
        .number()
        .min(1, "Duration must be at least 1 day"),

    creditResetIntervalInDays: z
        .number()
        .min(1, "Reset interval must be at least 1 day"),

    features: z.object({
        maxDocuments: z
            .number()
            .min(1, "Max documents must be at least 1"),

        interviewAccess: z.boolean(),
    }),
})
.superRefine((data, ctx) => {

    // MONTHLY PLAN RULES
    if (
        data.billingCycle === "MONTHLY" &&
        data.durationInDays !== 30
    ) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["durationInDays"],
            message:
                "Monthly plans must have 30 days duration",
        });
    }

    // YEARLY PLAN RULES
    if (
        data.billingCycle === "YEARLY" &&
        data.durationInDays !== 365
    ) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["durationInDays"],
            message:
                "Yearly plans must have 365 days duration",
        });
    }

    // RESET INTERVAL
    if (
        data.creditResetIntervalInDays >
        data.durationInDays
    ) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["creditResetIntervalInDays"],
            message:
                "Reset interval cannot exceed duration",
        });
    }
});

export type SubscriptionPlanFormData =
    z.infer<typeof subscriptionPlanSchema>;