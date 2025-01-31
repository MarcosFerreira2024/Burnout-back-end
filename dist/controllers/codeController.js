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
exports.verifyCode = void 0;
const codeSchema_1 = require("../schemas/codeSchema");
const jwt_1 = require("../services/jwt");
const HttpStatus_1 = __importDefault(require("../consts/HttpStatus"));
const codeModel_1 = require("../models/codeModel");
const verifyCode = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //pegar o req.body.code
    try {
        const data = codeSchema_1.codeSchema.safeParse(req.body.code);
        if (data.success) {
            const finded = yield (0, codeModel_1.findCodeModel)(data.data);
            if (finded instanceof Error) {
                res.status(HttpStatus_1.default.BAD_REQUEST).json({ message: "Codigo nao encontrado" });
                return;
            }
            const token = (0, jwt_1.createJWT)(finded);
            res.status(HttpStatus_1.default.OK).json({ token });
            return;
        }
        res.status(HttpStatus_1.default.BAD_REQUEST).json({
            message: data
        });
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
exports.verifyCode = verifyCode;
