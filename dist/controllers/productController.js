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
exports.getOneProduct = exports.updateProduct = exports.deleteProduct = exports.getAllProducts = exports.createProduct = void 0;
const HttpStatus_1 = __importDefault(require("../consts/HttpStatus"));
const productSchema_1 = require("../schemas/productSchema");
const productModel_1 = require("../models/productModel");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const validatedData = productSchema_1.productSchema.safeParse(req.body);
    try {
        if (validatedData.success) {
            const created = yield (0, productModel_1.createProductModel)(validatedData.data);
            if (created instanceof Error)
                throw new Error(created.message);
            res.status(HttpStatus_1.default.OK).json(created);
            return;
        }
        res.status(HttpStatus_1.default.BAD_REQUEST).json({ message: (_a = validatedData.error) === null || _a === void 0 ? void 0 : _a.issues[0].message });
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
exports.createProduct = createProduct;
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, productModel_1.getAllProductsModel)(req.query.name);
        if (products instanceof Error)
            throw new Error(products.message);
        res.status(HttpStatus_1.default.OK).json(products);
        return;
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(HttpStatus_1.default.BAD_REQUEST).json({ message: e.message });
        }
        return;
    }
});
exports.getAllProducts = getAllProducts;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const deleted = yield (0, productModel_1.deleteProductModel)(id);
        if (deleted instanceof Error)
            throw new Error(deleted.message);
        res.status(HttpStatus_1.default.OK).json(deleted);
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
exports.deleteProduct = deleteProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = productSchema_1.productSchema.partial().safeParse(req.query);
    try {
        if (data.error) {
            res.status(HttpStatus_1.default.BAD_REQUEST).json(data.error.flatten().fieldErrors);
            return;
        }
        if (Object.keys(req.query).length === 0 || id.length === 0)
            throw new Error("Dados para atualização não foram encontrados");
        const updated = yield (0, productModel_1.updateProductModel)(id, data.data);
        if (updated instanceof Error)
            throw new Error(updated.message);
        res.status(HttpStatus_1.default.OK).json(updated);
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
exports.updateProduct = updateProduct;
const getOneProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const produto = yield (0, productModel_1.getOneProductModel)(id);
        if (produto instanceof Error)
            throw new Error(produto.message);
        res.status(HttpStatus_1.default.OK).json(produto);
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(HttpStatus_1.default.BAD_REQUEST).json({ message: e.message });
            return;
        }
        return;
    }
});
exports.getOneProduct = getOneProduct;
