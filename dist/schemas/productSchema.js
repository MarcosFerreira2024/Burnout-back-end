"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const zod_1 = require("zod");
const ErrorMessages_1 = __importDefault(require("../consts/ErrorMessages"));
exports.productSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, ErrorMessages_1.default.productNameSizeError),
    price: zod_1.z.string().min(7, ErrorMessages_1.default.productPriceSizeError),
    size: zod_1.z.array(zod_1.z.string({ required_error: ErrorMessages_1.default.productSizeError })),
    photo: zod_1.z.array(zod_1.z.string()),
    colorName: zod_1.z.string().min(3, ErrorMessages_1.default.productColorNameSizeError),
    colorHex: zod_1.z.string().min(4, ErrorMessages_1.default.productColorHexMinSizeError).max(7, ErrorMessages_1.default.productColorHexMaxSizeError),
    frete: zod_1.z.string(),
    category: zod_1.z.array(zod_1.z.string().min(1, ErrorMessages_1.default.productCategoryError)),
});
