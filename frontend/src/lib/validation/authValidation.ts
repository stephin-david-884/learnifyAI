import {z} from 'zod';

export const registerSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be atleast 2 characters")
        .max(50, "Name must be atmost 50 characters")
        .regex(/^[A-Za-z]+( [A-Za-z]+)*$/, "Name must contain uppercase and lowercase letters"),
    email: z
        .string()
        .trim()
        .min(1, "Email is required")
        .email('Invalid email address'),
    password: z
        .string()
        .trim()
        .min(6, 'Password must contain atleast 6 characters')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@$%*&?])[a-zA-Z\d!@$%*&?]{6,}$/, "Password must contain uppercase, lowercase, number and special character"),
    confirmPassword: z
        .string()
})
.refine(data => data.password === data.confirmPassword, {
    message: 'Password do not match',
    path: ['confirmPassword']
})

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, 'Email is required')
        .email('Invalid email'),
    password: z
         .string()
         .trim()
        .min(6, 'Password must contain atleast 6 characters')
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@$%*&?])[a-zA-Z\d!@$%*&?]{6,}$/, "Password must contain uppercase, lowercase, number and special character")
})