import z from "zod"
import ErrorMessage from "../consts/ErrorMessages"



export const registerUserSchema = z.object({
    name: z.string().min(2, ErrorMessage.nameSizeError),

    email: z.string().min(7, ErrorMessage.emailSizeError).email(ErrorMessage.emailTypeError),

    password: z.string().min(8, ErrorMessage.passwordSizeError),

    confirmPassword: z.string().min(8, ErrorMessage.confirmPasswordSizeError),

}).refine((data) => data.password === data.confirmPassword, {
    message: ErrorMessage.passwordMatchError,
    path: ["confirmPassword"]

})

export const loginSchema = z.object({
    email: z.string().min(7, ErrorMessage.emailSizeError).email(ErrorMessage.emailTypeError),
    password: z.string().min(8, ErrorMessage.passwordSizeError),
})


export const updateSchema = z.object({
    email: z.string().min(7, ErrorMessage.emailSizeError).email(ErrorMessage.emailSizeError),
    password: z.string().min(8, ErrorMessage.passwordSizeError),
    name: z.string().min(2, ErrorMessage.nameSizeError),
    confirmPassword: z.string().min(8, ErrorMessage.confirmPasswordSizeError),
    photo: z.string(),
    favoritos: z.array(z.string()),
    carrinho: z.array(z.string()),



}).partial().refine((data) => !data.password || !data.confirmPassword || data.password === data.confirmPassword, {
    message: ErrorMessage.passwordMatchError,
    path: ["confirmPassword"]

})