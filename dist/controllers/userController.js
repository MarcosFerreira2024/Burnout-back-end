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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getAllUsers = exports.getUser = exports.deleteAnyUser = exports.deleteUser = exports.login = exports.CreateUser = void 0;
const userSchema_1 = require("../schemas/userSchema");
const HttpStatus_1 = __importDefault(require("../consts/HttpStatus"));
const userModel_1 = require("../models/userModel");
const sendVerificationCode_1 = require("../services/sendVerificationCode");
const jwt_1 = require("../services/jwt");
const codeModel_1 = require("../models/codeModel");
const createCode_1 = require("../services/createCode");
const CreateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // pegar os dados
    if (req.body.role) {
        res.status(HttpStatus_1.default.FORBIDDEN).json({ msg: "ACESSO NEGADO" });
        return;
    }
    const dados = userSchema_1.registerUserSchema.safeParse(req.body);
    // verificar os dados
    if (dados.error) {
        res.status(HttpStatus_1.default.BAD_REQUEST).json({
            message: (_a = dados.error) === null || _a === void 0 ? void 0 : _a.issues[0].message
        });
        return;
    }
    // mandar os dados pro model
    try {
        const _b = dados.data, { confirmPassword } = _b, data = __rest(_b, ["confirmPassword"]);
        const user = yield (0, userModel_1.CreateUserModel)(data);
        if (user instanceof Error) {
            res.status(HttpStatus_1.default.BAD_REQUEST).json({
                message: user.message
            });
            return;
        }
        if (!user) {
            throw new Error("Erro Interno");
        }
        const email = yield (0, sendVerificationCode_1.sendVerificationCode)(user.email, user.code);
        if (email) {
            res.status(HttpStatus_1.default.OK).json({
                message: "Código Enviado para o Email"
            });
            return;
        }
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(HttpStatus_1.default.BAD_REQUEST).json({
                message: e.message
            });
            return;
        }
        return;
    }
});
exports.CreateUser = CreateUser;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    //pegar os dados de email, senha e o codigo
    const validation = userSchema_1.loginSchema.safeParse(req.body);
    if (validation.success) {
        try {
            const user = yield (0, userModel_1.findUserModel)("email", validation.data.email);
            if (user instanceof Error) {
                res.status(HttpStatus_1.default.BAD_REQUEST).json({ message: user.message });
                return;
            }
            if (user.status === true) {
                const jwt = yield (0, jwt_1.validatePasswordToCreateJWT)(validation.data.password, user);
                if (jwt instanceof Error) {
                    res.status(HttpStatus_1.default.BAD_REQUEST).json({
                        message: jwt.message
                    });
                    return;
                }
                if (user.code) {
                    yield (0, codeModel_1.deleteCodeModel)((_a = user.code) === null || _a === void 0 ? void 0 : _a.id);
                }
                res.status(HttpStatus_1.default.OK).json({
                    token: jwt
                });
                return;
            }
            const code = yield (0, createCode_1.handleCode)(user);
            if (code instanceof Error) {
                res.status(HttpStatus_1.default.BAD_REQUEST).json({ message: code.message });
                return;
            }
            if (code.email) {
                const email = yield (0, sendVerificationCode_1.sendVerificationCode)(code.email, code.code);
                res.status(HttpStatus_1.default.OK).json({
                    message: email
                });
                return;
            }
            res.status(HttpStatus_1.default.OK).json({
                message: "Insira o código que foi enviado ao seu email",
            });
            return;
        }
        catch (_c) {
            res.status(HttpStatus_1.default.INTERNAL_SERVER_ERROR).json({
                message: "Erro interno"
            });
            return;
        }
    }
    res.status(HttpStatus_1.default.BAD_REQUEST).json({
        message: (_b = validation.error) === null || _b === void 0 ? void 0 : _b.issues[0].message
    });
    return;
});
exports.login = login;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //receber o token 
    try {
        if (!req.headers.authorization)
            throw new Error("Sem token");
        const validatedToken = (0, jwt_1.verifyJWT)(req.headers.authorization);
        if (validatedToken instanceof Error) {
            throw new Error(validatedToken.message);
        }
        const deleted = yield (0, userModel_1.deleteUserModel)(validatedToken.id);
        if (deleted instanceof Error) {
            res.status(HttpStatus_1.default.BAD_REQUEST).json({
                message: deleted.message
            });
            return;
        }
        res.status(HttpStatus_1.default.OK).json({
            message: "Usuário deletado com sucesso"
        });
        return;
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(HttpStatus_1.default.BAD_REQUEST).json({
                message: e.message
            });
            return;
        }
        return;
    }
});
exports.deleteUser = deleteUser;
const deleteAnyUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const deleted = yield (0, userModel_1.deleteUserModel)(id);
        if (deleted instanceof Error) {
            res.status(HttpStatus_1.default.BAD_REQUEST).json({
                message: deleted.message
            });
            return;
        }
        res.status(HttpStatus_1.default.OK).json({
            message: deleted
        });
        return;
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(HttpStatus_1.default.BAD_REQUEST).json({
                message: e.message
            });
            return;
        }
        return;
    }
});
exports.deleteAnyUser = deleteAnyUser;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //pegar o token
    if (!req.headers.authorization)
        throw new Error("Sem Token");
    try {
        const token = (0, jwt_1.verifyJWT)(req.headers.authorization);
        if (token instanceof Error)
            throw new Error(token.message);
        const user = yield (0, userModel_1.getUserModel)(token);
        if (user instanceof Error)
            throw new Error(user.message);
        res.status(HttpStatus_1.default.OK).json(user);
        return;
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(HttpStatus_1.default.BAD_REQUEST).json({ message: e.message });
            return;
        }
        return;
    }
});
exports.getUser = getUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userModel_1.getAllUsersModel)();
        if (users instanceof Error)
            throw new Error(users.message);
        res.status(HttpStatus_1.default.OK).json(users);
        return;
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(HttpStatus_1.default.BAD_REQUEST).json({ message: e.message });
            return;
        }
        return;
    }
});
exports.getAllUsers = getAllUsers;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (token) {
        try {
            const { email, id } = (0, jwt_1.verifyJWT)(token);
            const finded = yield (0, userModel_1.findUserModel)("email", email);
            if (finded instanceof Error)
                throw new Error(finded.message);
            if (req.body.role && finded.role !== "ADMIN") {
                res.status(HttpStatus_1.default.FORBIDDEN).json({ msg: "ACESSO NEGADO" });
                return;
            }
            const validatedData = userSchema_1.updateSchema.safeParse(req.body);
            if (validatedData.error) {
                res.status(HttpStatus_1.default.BAD_REQUEST).json(validatedData.error.flatten().fieldErrors);
                return;
            }
            const updatedUser = yield (0, userModel_1.updateUserModel)(id, validatedData.data);
            if (updatedUser instanceof Error)
                throw new Error(updatedUser.message);
            res.status(HttpStatus_1.default.OK).json(updatedUser);
            return;
        }
        catch (e) {
            if (e instanceof Error) {
                res.status(HttpStatus_1.default.BAD_REQUEST).json({ msg: e.message });
                return;
            }
            return;
        }
    }
});
exports.updateUser = updateUser;
