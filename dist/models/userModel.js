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
exports.getAllUsersModel = exports.getUserModel = exports.deleteUserModel = exports.updateUserModel = exports.findUserModel = exports.CreateUserModel = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prismaClient_1 = __importDefault(require("../lib/prismaClient"));
const createCode_1 = require("../services/createCode");
const CreateUserModel = (data) => __awaiter(void 0, void 0, void 0, function* () {
    //verificar se o usuário existe
    try {
        const user = yield (0, exports.findUserModel)("email", data.email);
        if (user instanceof Error && user.message === "Usuário não foi encontrado") {
            const salt = 10;
            //criptografar a senha antes de mandar pro banco de dados
            const hashedPassword = yield bcrypt_1.default.hash(data.password, salt);
            const createdUser = yield prismaClient_1.default.users.create({
                data: Object.assign(Object.assign({}, data), { password: hashedPassword, carrinho: {
                        create: {
                            cartItem: {
                                create: []
                            }
                        }
                    } }),
                include: {
                    carrinho: {
                        include: {
                            cartItem: true
                        }
                    },
                    fav: true,
                    avaliacoes: true,
                    comments: true,
                    code: true,
                }
            });
            if (!createdUser)
                throw new Error("Ocorreu um erro ao criar o usuário");
            const code = yield (0, createCode_1.handleCode)(createdUser);
            if (code instanceof Error)
                throw new Error(code.message);
            return code;
        }
        if (user instanceof Error)
            throw new Error(user.message);
        if (user.status === true)
            throw new Error("O usuario já existe");
        const newCode = yield (0, createCode_1.handleCode)(user);
        if (newCode instanceof Error)
            throw new Error(newCode.message);
        return newCode;
    }
    catch (e) {
        if (e instanceof Error) {
            return new Error(e.message);
        }
        return new Error("Erro Desconhecido");
    }
});
exports.CreateUserModel = CreateUserModel;
//função para encontrar usuário
const findUserModel = (identificador, value) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const where = identificador === "id" ? { id: value } : identificador === "email" ? { email: value } : undefined;
        if (!where)
            throw new Error("Chave Inválida para busca");
        const user = yield prismaClient_1.default.users.findUnique({
            where,
            include: {
                carrinho: {
                    include: {
                        cartItem: true
                    }
                },
                fav: true,
                avaliacoes: true,
                comments: true,
                code: true,
            }
        });
        if (!user)
            throw new Error("Usuário não foi encontrado");
        return user;
    }
    catch (e) {
        if (e instanceof Error) {
            return new Error(e.message);
        }
        return new Error("Erro Desconhecido");
    }
});
exports.findUserModel = findUserModel;
const updateUserModel = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield prismaClient_1.default.users.update({
            where: {
                id
            },
            data,
            include: {
                carrinho: {
                    include: {
                        cartItem: true
                    }
                },
                fav: true,
                avaliacoes: true,
                comments: true,
                code: true,
            }
        });
        if (updated) {
            return updated;
        }
        throw new Error("Nao foi possivel atualizar o usuario");
    }
    catch (e) {
        if (e instanceof Error) {
            return e.message;
        }
        return new Error("Erro Interno");
    }
});
exports.updateUserModel = updateUserModel;
const deleteUserModel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleted = yield prismaClient_1.default.users.delete({
            where: {
                id
            }
        });
        if (deleted) {
            return deleted;
        }
        throw new Error("Não foi possivel deletar o usuário");
    }
    catch (e) {
        if (e instanceof Error && e.message.includes("not found")) {
            throw new Error("Usuário Não existe");
        }
        throw new Error("Erro Interno");
    }
});
exports.deleteUserModel = deleteUserModel;
const getUserModel = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, exports.findUserModel)("email", token.email);
        if (user instanceof Error)
            throw new Error(user.message);
        return user;
    }
    catch (e) {
        if (e instanceof Error)
            return new Error(e.message);
        return new Error("Erro interno");
    }
});
exports.getUserModel = getUserModel;
const getAllUsersModel = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prismaClient_1.default.users.findMany({
            include: {
                carrinho: {
                    include: {
                        cartItem: true
                    }
                },
                fav: true,
                avaliacoes: true,
                comments: true,
                code: true,
            }
        });
        return users;
    }
    catch (e) {
        if (e instanceof Error)
            return new Error(e.message);
        return new Error("Erro interno");
    }
});
exports.getAllUsersModel = getAllUsersModel;
