import z from "zod"
import ErrorMessage from "../consts/ErrorMessages"

export const codeSchema = z.string().min(24, ErrorMessage.codeSizeError).max(24, ErrorMessage.codeSizeError)
