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
exports.updateCartModel = exports.getCartItemsModel = exports.removeAllFromOneProductModel = exports.addOrIncrementProductInCartModel = void 0;
const prismaClient_1 = __importDefault(require("../lib/prismaClient"));
const cartService_1 = require("../services/cartService");
const addOrIncrementProductInCartModel = (user, product) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, cartService_1.verifyDataFromCart)(user, product);
        if (data instanceof Error)
            throw new Error(data.message);
        if (data) {
            const { findedUser, findedProduct } = data;
            if (findedUser.carrinho) {
                const finded = findedUser.carrinho.cartItem.find((item) => item.productId === findedProduct.id);
                if (finded) {
                    const added = yield (0, cartService_1.addOrRemove)(finded, "add");
                    return added;
                }
                const produtoAdicionado = yield prismaClient_1.default.cartItem.create({
                    data: { quantity: 1, productId: findedProduct.id, cartId: findedUser.carrinho.id },
                    select: {
                        quantity: true,
                        product: true
                    }
                });
                if (produtoAdicionado)
                    return produtoAdicionado;
            }
            const createdCart = yield prismaClient_1.default.cart.upsert({
                where: {
                    userId: findedUser.id,
                },
                create: {
                    userId: findedUser.id,
                    cartItem: {
                        create: {
                            productId: findedProduct.id,
                            quantity: 1,
                        },
                    },
                },
                update: {
                    cartItem: {
                        create: {
                            productId: findedProduct.id,
                            quantity: 1,
                        },
                    },
                },
                select: {
                    cartItem: {
                        select: {
                            quantity: true,
                            product: true
                        }
                    }
                }
            });
            if (createdCart instanceof Error)
                throw new Error("Não foi possivel Criar o Carrinho tente novamente");
            return createdCart.cartItem[0];
        }
        throw new Error("Erro Interno");
    }
    catch (e) {
        if (e instanceof Error)
            return new Error(e.message);
        return new Error("Erro Desconhecido");
    }
});
exports.addOrIncrementProductInCartModel = addOrIncrementProductInCartModel;
const removeAllFromOneProductModel = (user, product) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, cartService_1.verifyDataFromCart)(user, product);
        if (data instanceof Error)
            throw new Error(data.message);
        if (!data)
            throw new Error("Erro Interno");
        const { findedProduct, findedUser } = data;
        if (findedUser.carrinho) {
            const finded = findedUser.carrinho.cartItem.find((item) => item.productId === findedProduct.id);
            if (finded) {
                const deleted = yield prismaClient_1.default.cartItem.delete({
                    where: {
                        id: finded.id
                    }
                });
                return deleted;
            }
        }
        throw new Error("Carrinho Vazio");
    }
    catch (e) {
        if (e instanceof Error)
            return new Error(e.message);
        return new Error("Erro Desconhecido");
    }
});
exports.removeAllFromOneProductModel = removeAllFromOneProductModel;
const getCartItemsModel = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield prismaClient_1.default.cart.findUnique({
            where: {
                userId: user
            },
            select: {
                cartItem: {
                    select: {
                        product: true,
                        quantity: true
                    }
                }
            }
        });
        if (items) {
            if (items.cartItem.length > 0)
                return items.cartItem;
        }
        throw new Error("Carrinho Vazio");
    }
    catch (e) {
        if (e instanceof Error)
            return new Error(e.message);
    }
});
exports.getCartItemsModel = getCartItemsModel;
const updateCartModel = (user, cart) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prismaClient_1.default.cart.update({
            where: {
                userId: user
            },
            data: {
                cartItem: {
                    deleteMany: {},
                    createMany: {
                        data: cart.map((item) => ({
                            quantity: item.quantity,
                            productId: item.product.id,
                        }))
                    }
                }
            },
            select: {
                cartItem: {
                    select: {
                        quantity: true,
                        product: true
                    }
                }
            }
        });
        if (result) { // verificando se houve algum erro na requisição do front e removendo o carrinho caso haja um produto com quantidade 0
            const filteredResult = result.cartItem.filter((item) => item.quantity !== 0);
            if (filteredResult.length === 0)
                throw new Error("Carrinho Vazio");
            return filteredResult;
        }
        throw new Error("Carrinho Vazio");
    }
    catch (e) {
        if (e instanceof Error)
            return new Error(e.message);
    }
});
exports.updateCartModel = updateCartModel;
