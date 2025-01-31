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
exports.findCodeModel = exports.deleteCodeModel = exports.updateCodeModel = void 0;
const prismaClient_1 = __importDefault(require("../lib/prismaClient"));
const userModel_1 = require("./userModel");
const updateCodeModel = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield prismaClient_1.default.code.update({
            where: {
                id
            },
            data,
            select: {
                id: true,
                userId: true,
                used: true,
                user: true
            }
        });
        if (updated) {
            return updated;
        }
        throw new Error("Nao foi possivel atualizar o code");
    }
    catch (e) {
        if (e instanceof Error) {
            return e.message;
        }
        return new Error("Erro Interno");
    }
});
exports.updateCodeModel = updateCodeModel;
const deleteCodeModel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deleted = yield prismaClient_1.default.code.delete({
        where: {
            id
        }
    });
    if (deleted) {
        return deleted;
    }
    return;
});
exports.deleteCodeModel = deleteCodeModel;
const findCodeModel = (code) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const codigo = yield prismaClient_1.default.code.findUnique({
            where: {
                id: code
            },
            select: {
                id: true,
                userId: true,
                used: true,
                user: true
            }
        });
        if (codigo) {
            const findedUser = yield (0, userModel_1.findUserModel)("email", codigo.user.email);
            if (findedUser instanceof Error)
                throw new Error(findedUser.message);
            yield (0, exports.deleteCodeModel)(codigo.id);
            yield (0, userModel_1.updateUserModel)(findedUser.id, { status: true });
            return findedUser;
        }
        throw new Error("Não foi possivel encontrar o codigo");
    }
    catch (e) {
        if (e instanceof Error) {
            return new Error(e.message);
        }
        return new Error("Erro Interno");
    }
});
exports.findCodeModel = findCodeModel;
