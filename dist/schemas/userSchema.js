"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSchema = exports.loginSchema = exports.registerUserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const ErrorMessages_1 = __importDefault(require("../consts/ErrorMessages"));
exports.registerUserSchema = zod_1.default.object({
    name: zod_1.default.string().min(2, ErrorMessages_1.default.nameSizeError),
    email: zod_1.default.string().min(7, ErrorMessages_1.default.emailSizeError).email(ErrorMessages_1.default.emailTypeError),
    password: zod_1.default.string().min(8, ErrorMessages_1.default.passwordSizeError),
    confirmPassword: zod_1.default.string().min(8, ErrorMessages_1.default.confirmPasswordSizeError),
}).refine((data) => data.password === data.confirmPassword, {
    message: ErrorMessages_1.default.passwordMatchError,
    path: ["confirmPassword"]
});
exports.loginSchema = zod_1.default.object({
    email: zod_1.default.string().min(7, ErrorMessages_1.default.emailSizeError).email(ErrorMessages_1.default.emailTypeError),
    password: zod_1.default.string().min(8, ErrorMessages_1.default.passwordSizeError),
});
exports.updateSchema = zod_1.default.object({
    email: zod_1.default.string().min(7, ErrorMessages_1.default.emailSizeError).email(ErrorMessages_1.default.emailSizeError),
    password: zod_1.default.string().min(8, ErrorMessages_1.default.passwordSizeError),
    name: zod_1.default.string().min(2, ErrorMessages_1.default.nameSizeError),
    confirmPassword: zod_1.default.string().min(8, ErrorMessages_1.default.confirmPasswordSizeError),
    photo: zod_1.default.string(),
}).partial().refine((data) => !data.password || !data.confirmPassword || data.password === data.confirmPassword, {
    message: ErrorMessages_1.default.passwordMatchError,
    path: ["confirmPassword"]
});
