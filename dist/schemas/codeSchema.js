"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const ErrorMessages_1 = __importDefault(require("../consts/ErrorMessages"));
exports.codeSchema = zod_1.default.string().min(24, ErrorMessages_1.default.codeSizeError).max(24, ErrorMessages_1.default.codeSizeError);
