"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationCode = void 0;
exports.handleCode = handleCode;
exports.createVerificationCode = createVerificationCode;
const prismaClient_1 = __importDefault(require("../lib/prismaClient"));
const codeModel_1 = require("../models/codeModel");
function handleCode(user) {
    return __awaiter(this, void 0, void 0, function* () {
        //verifica se existe o user.code
        try {
            if (user.code && user.code.used === false) {
                const code = yield prismaClient_1.default.code.findUnique({
                    where: {
                        id: user.code.id
                    },
                    select: {
                        id: true,
                        expiresAt: true,
                        used: true,
                    }
                });
                if (code && code.expiresAt < new Date()) {
                    const deleted = yield (0, codeModel_1.deleteCodeModel)(code.id);
                    //criar novo código
                    if (!(deleted instanceof Error)) {
                        const code = yield (0, exports.ValidationCode)(user);
                        if (!(code instanceof Error)) {
                            return { email: user.email, code: code.id };
                        }
                        throw new Error(code.message);
                    }
                    throw new Error("Erro Interno");
                }
                if (user.code.expiresAt > new Date()) {
                    throw new Error("Verifique seu email");
                }
            }
            const code = yield (0, exports.ValidationCode)(user);
            if (!(code instanceof Error)) {
                return { email: user.email, code: code.id };
            }
            throw new Error(code.message);
        }
        catch (e) {
            if (e instanceof Error) {
                return new Error(e.message);
            }
            return new Error("Erro Desconhecido");
        }
    });
}
const ValidationCode = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const code = yield createVerificationCode(user);
    if (!(code instanceof Error)) {
        return code;
    }
    return new Error(code.message);
});
exports.ValidationCode = ValidationCode;
function createVerificationCode(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 1);
        try {
            const code = yield prismaClient_1.default.code.create({
                data: {
                    userId: user.id,
                    used: false,
                    expiresAt,
                },
                select: {
                    id: true,
                    used: true
                }
            });
            return code;
        }
        catch (_a) {
            return new Error("Não foi possivel gerar um código");
        }
    });
}
