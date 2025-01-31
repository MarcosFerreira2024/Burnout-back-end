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
exports.cartOperations = exports.verifyDataFromCart = exports.addOrRemove = void 0;
const prismaClient_1 = __importDefault(require("../lib/prismaClient"));
const userModel_1 = require("../models/userModel");
const productModel_1 = require("../models/productModel");
const addOrRemove = (finded, operation) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (operation === "remove") {
            const findedCartItemQuantity = yield prismaClient_1.default.cartItem.findUnique({
                where: {
                    id: finded.id
                },
                select: {
                    quantity: true
                }
            });
            if (findedCartItemQuantity instanceof Error)
                throw new Error(findedCartItemQuantity.message);
            if (findedCartItemQuantity) {
                if (findedCartItemQuantity.quantity === 1) {
                    yield prismaClient_1.default.cartItem.delete({
                        where: {
                            id: finded.id
                        }
                    });
                    return "Produto Deletado do Carrinho";
                }
            }
        }
        const updated = yield prismaClient_1.default.cartItem.update({
            where: {
                id: finded.id
            },
            data: {
                quantity: operation === "add" ? finded.quantity + 1 : finded.quantity - 1
            },
            select: {
                quantity: true,
                product: true
            },
        });
        return updated;
    }
    catch (e) {
        if (e instanceof Error)
            return new Error(e.message);
    }
});
exports.addOrRemove = addOrRemove;
const verifyDataFromCart = (user, product) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findedUser = yield (0, userModel_1.findUserModel)("id", user);
        const findedProduct = yield (0, productModel_1.findProduct)("id", product);
        if (!findedProduct && !findedUser)
            throw new Error("Erro Interno");
        if (findedUser instanceof Error)
            throw new Error(findedUser.message);
        if (findedProduct instanceof Error)
            throw new Error(findedProduct.message);
        return { findedUser, findedProduct };
    }
    catch (e) {
        if (e instanceof Error)
            return new Error(e.message);
        return new Error("Erro Desconhecido");
    }
});
exports.verifyDataFromCart = verifyDataFromCart;
const cartOperations = (user, product, operation) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!user || !product)
            throw new Error("Dados invalidos");
        const result = yield operation(user, product);
        if (result instanceof Error)
            throw new Error(result.message);
        if (!result)
            throw new Error("Erro Interno");
        return result;
    }
    catch (e) {
        if (e instanceof Error)
            return new Error(e.message);
        return new Error("Erro Interno");
    }
});
exports.cartOperations = cartOperations;
