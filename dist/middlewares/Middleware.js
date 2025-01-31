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
exports.adminMiddleware = exports.authMiddleware = void 0;
const jwt_1 = require("../services/jwt");
const HttpStatus_1 = __importDefault(require("../consts/HttpStatus"));
const userModel_1 = require("../models/userModel");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //receber o token e ver se o usuário relacionado a ele já verificou o email
    try {
        if (!req.headers.authorization)
            throw new Error("Sem Token");
        const token = (0, jwt_1.verifyJWT)(req.headers.authorization);
        if (token instanceof Error) {
            res.status(HttpStatus_1.default.UNAUTHORIZED).json({
                message: "Token Inválido"
            });
            return;
        }
        next();
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(HttpStatus_1.default.BAD_REQUEST).json({ message: e.message });
            return;
        }
        res.status(HttpStatus_1.default.INTERNAL_SERVER_ERROR).json({
            message: "Erro Interno"
        });
        return;
    }
});
exports.authMiddleware = authMiddleware;
const adminMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.headers.authorization)
            throw new Error("Sem Token");
        const token = (0, jwt_1.verifyJWT)(req.headers.authorization);
        if (token instanceof Error) {
            res.status(HttpStatus_1.default.UNAUTHORIZED).json({
                message: "Token Inválido"
            });
            return;
        }
        const finded = yield (0, userModel_1.findUserModel)("email", token.email);
        if (finded instanceof Error)
            throw new Error(finded.message);
        if (finded.role !== "ADMIN") {
            res.status(HttpStatus_1.default.FORBIDDEN).json({
                message: "ACESSO NEGADO"
            });
            return;
        }
        next();
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(HttpStatus_1.default.BAD_REQUEST).json({ message: e.message });
            return;
        }
        return;
    }
});
exports.adminMiddleware = adminMiddleware;
