import { z } from 'zod';

export const registerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be atleast 2 characters")
        .regex(/^[A-Za-z]+( [A-Za-z]+)*$/),
    email: z
        .string()
        .trim()
        .min(1, "Email is required")
        .email('Invalid email address'),
    password: z
        .string()
        .trim()
        .min(6, 'Password must contain atleast 6 characters')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@$%*&?])[a-zA-Z\d!@$%*&?]{6,}$/),
    confirmPassword: z
        .string()
})
    .refine(data => data.password === data.confirmPassword, {
        message: 'Password do not match',
        path: ['confirmPassword']
    })
    .transform(({ confirmPassword, ...rest }) => rest);

export type RegisterBody = z.infer<typeof registerSchema>;    

export const otpSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, 'Email is required'),
    otp: z
        .string()
        .trim()
        .regex(/^\d{6}$/, 'OTP must contain only numbers')
        .min(6, "OTP must be exactly 6 digit")
});

export type VerifyOtpBody = z.infer<typeof otpSchema>;

export const resendOtpSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, 'Email is required')
        .email('Invalid email')
});

export type ResendOtpBody = z.infer<typeof resendOtpSchema>;