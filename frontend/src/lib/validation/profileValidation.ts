import { z } from "zod";

export const updateProfileSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be at most 50 characters")
        .regex(
            /^[A-Za-z]+( [A-Za-z]+)*$/,
            "Name must contain only letters and spaces"
        ),
});

export const changePasswordSchema = z
    .object({
        currentPassword: z
            .string()
            .trim()
            .min(6, "Current password is required"),

        newPassword: z
            .string()
            .trim()
            .min(
                6,
                "Password must contain at least 6 characters"
            )
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/,
                "Password must contain uppercase, lowercase, number and special character"
            ),

        confirmPassword: z
            .string()
            .trim(),
    })
    .refine(
        (data) => data.newPassword === data.confirmPassword,
        {
            path: ["confirmPassword"],
            message: "Passwords do not match",
        }
    )
    .refine(
        (data) => data.currentPassword !== data.newPassword,
        {
            path: ["newPassword"],
            message:
                "New password must be different from current password",
        }
    );

export type UpdateProfileFormValues = z.infer<
    typeof updateProfileSchema
>;

export type ChangePasswordFormValues = z.infer<
    typeof changePasswordSchema
>;