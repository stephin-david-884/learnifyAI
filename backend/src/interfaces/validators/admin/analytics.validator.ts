import { z } from "zod";

const periods = [
    "LAST_7_DAYS",
    "LAST_30_DAYS",
    "LAST_90_DAYS",
    "THIS_MONTH",
    "CUSTOM",
] as const;

export const analyticsFilterSchema = z
    .object({

        period: z
            .enum(periods)
            .default("LAST_7_DAYS"),

        startDate: z
            .string()
            .datetime()
            .optional(),

        endDate: z
            .string()
            .datetime()
            .optional(),

    })
    .superRefine((data, ctx) => {

        if (data.period === "CUSTOM") {

            if (!data.startDate) {

                ctx.addIssue({

                    code: z.ZodIssueCode.custom,

                    path: ["startDate"],

                    message:
                        "startDate is required for CUSTOM period",

                });

            }

            if (!data.endDate) {

                ctx.addIssue({

                    code: z.ZodIssueCode.custom,

                    path: ["endDate"],

                    message:
                        "endDate is required for CUSTOM period",

                });

            }

        }

    });