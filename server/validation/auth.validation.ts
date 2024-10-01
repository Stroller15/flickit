import {string, z} from "zod";

export const registerSchema = z.object({
    name: z.string().max(50).min(3),
    email: z.string(),
    password: z.string(),
    confirmPassword: z.string()
})