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
exports.receiveCartState = exports.getCartItems = exports.removeAllFromOneProduct = exports.addOrIncrementProductInCart = void 0;
const HttpStatus_1 = __importDefault(require("../consts/HttpStatus"));
const cartService_1 = require("../services/cartService");
const cartModel_1 = require("../models/cartModel");
const addOrIncrementProductInCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.params.userId;
    const product = req.params.produtoId;
    try {
        const added = yield (0, cartService_1.cartOperations)(user, product, cartModel_1.addOrIncrementProductInCartModel);
        if (added instanceof Error)
            throw new Error(added.message);
        res.status(HttpStatus_1.default.OK).json(added);
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
exports.addOrIncrementProductInCart = addOrIncrementProductInCart;
const removeAllFromOneProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.params.userId;
    const product = req.params.produtoId;
    try {
        const removed = yield (0, cartService_1.cartOperations)(user, product, cartModel_1.removeAllFromOneProductModel);
        if (removed instanceof Error)
            throw new Error(removed.message);
        res.status(HttpStatus_1.default.OK).json(removed);
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
exports.removeAllFromOneProduct = removeAllFromOneProduct;
const getCartItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.params.userId;
    try {
        if (!user)
            throw new Error("Dados invalidos");
        const cartItems = yield (0, cartModel_1.getCartItemsModel)(user);
        if (cartItems instanceof Error)
            throw new Error(cartItems.message);
        res.status(HttpStatus_1.default.OK).json(cartItems);
        return;
    }
    catch (e) {
        if (e instanceof Error)
            res.status(HttpStatus_1.default.BAD_REQUEST).json({ message: e.message });
    }
});
exports.getCartItems = getCartItems;
const receiveCartState = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.params.userId;
    const cart = req.body;
    try {
        if (!user || !cart)
            throw new Error("Dados invalidos");
        const result = yield (0, cartModel_1.updateCartModel)(user, cart);
        if (result instanceof Error)
            throw new Error(result.message);
        res.status(HttpStatus_1.default.OK).json(result);
        return;
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(HttpStatus_1.default.BAD_REQUEST).json({ message: e.message });
            return;
        }
    }
});
exports.receiveCartState = receiveCartState;
