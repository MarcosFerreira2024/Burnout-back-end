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
exports.createJWT = createJWT;
exports.validatePasswordToCreateJWT = validatePasswordToCreateJWT;
exports.verifyJWT = verifyJWT;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
function createJWT(user) {
    const token = jsonwebtoken_1.default.sign({ email: user.email, id: user.id }, process.env.MY_SECRET_KEY);
    return token;
}
function validatePasswordToCreateJWT(password, user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const comparedPassword = yield bcrypt_1.default.compare(password, user.password);
            if (!comparedPassword) {
                throw new Error("Senha Incorreta");
            }
            const token = createJWT(user);
            return token;
        }
        catch (e) {
            if (e instanceof Error) {
                return new Error(e.message);
            }
            return new Error("Erro Interno");
        }
    });
}
function verifyJWT(authorization) {
    try {
        const token = authorization.split(" ")[1];
        const validatedToken = jsonwebtoken_1.default.verify(token, process.env.MY_SECRET_KEY);
        if (typeof validatedToken === "string") {
            throw new Error("Token inválido");
        }
        return validatedToken;
    }
    catch (e) {
        if (e instanceof Error) {
            return new Error(e.message);
        }
        return new Error("Erro Interno");
    }
}
