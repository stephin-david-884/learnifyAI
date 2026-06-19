import { z } from "zod";

export const changePasswordSchema =
    z.object({
        currentPassword: z
            .string(),

        newPassword: z
            .string()
            .trim()
            .min(6, 'Password must contain atleast 6 characters')
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@$%*&?])[a-zA-Z\d!@$%*&?]{6,}$/),
    });