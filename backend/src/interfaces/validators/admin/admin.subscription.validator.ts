import z from "zod";

const featuresSchema = z.object({
    maxDocuments: z
        .number()
        .int()
        .nonnegative(),

    interviewAccess: z.boolean(),
});

const basePlanSchema = {
    name: z
        .string()
        .trim()
        .min(1, "Plan name is required"),

    price: z
        .number()
        .nonnegative("Price cannot be negative"),

    creditsPerMonth: z
        .number()
        .int()
        .positive("Credits must be greater than 0"),

    discount: z
        .number()
        .min(0)
        .max(100)
        .optional(),

    features: featuresSchema,

    billingCycle: z.enum([
        "MONTHLY",
        "YEARLY",
    ]),

    durationInDays: z
        .number()
        .int()
        .positive(),

    creditResetIntervalInDays: z
        .number()
        .int()
        .positive(),
};

export const createSubscriptionPlanSchema =
    z.object(basePlanSchema);

export const updateSubscriptionPlanSchema =
    z.object(basePlanSchema);

export const deactivateSubscriptionPlanSchema =
    z.object({
        planId: z
            .string()
            .min(1, "Plan ID is required"),
    });