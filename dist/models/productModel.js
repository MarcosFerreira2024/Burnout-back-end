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
exports.getOneProductModel = exports.updateProductModel = exports.deleteProductModel = exports.getAllProductsModel = exports.findProduct = exports.createProductModel = void 0;
const prismaClient_1 = __importDefault(require("../lib/prismaClient"));
const createProductModel = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (data) {
            const verificaExistente = yield (0, exports.findProduct)("name", data.name);
            if (verificaExistente instanceof Error) {
                const created = yield prismaClient_1.default.produtos.create({
                    data,
                });
                if (created)
                    return created;
                throw new Error("Erro Interno");
            }
            throw new Error("Produto já existe");
        }
        throw new Error("Nao foi possivel criar o produto");
    }
    catch (e) {
        if (e instanceof Error)
            return new Error(e.message);
        return new Error("Erro Desconhecido");
    }
});
exports.createProductModel = createProductModel;
const findProduct = (identificador, value) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const where = identificador === "id" ? { id: value } : identificador === "name" ? { name: value } : undefined;
        if (!where)
            throw new Error("Chave inválida para busca");
        const produtoEncontrado = yield prismaClient_1.default.produtos.findUnique({
            where
        });
        if (!produtoEncontrado)
            return new Error("Produto não foi encontrado");
        return produtoEncontrado;
    }
    catch (e) {
        if (e instanceof Error) {
            if (e.message.includes("not found"))
                return new Error("Produto não foi encontrado");
            return new Error(e.message);
        }
        return new Error("Erro Desconhecido");
    }
});
exports.findProduct = findProduct;
const getAllProductsModel = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (name) {
            if (name === "Produtos") {
                const produtos = yield prismaClient_1.default.produtos.findMany({});
                if (produtos)
                    return produtos;
            }
            const produtos = yield prismaClient_1.default.produtos.findMany({
                where: {
                    name: {
                        contains: name
                    }
                }
            });
            if (produtos)
                return produtos;
            throw new Error("Nao foi possivel encontrar os produtos");
        }
        throw new Error("Nao foi possivel encontrar os produtos");
    }
    catch (e) {
        if (e instanceof Error)
            return new Error(e.message);
        return new Error("Erro Desconhecido");
    }
});
exports.getAllProductsModel = getAllProductsModel;
const deleteProductModel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const produto = yield (0, exports.findProduct)("id", id);
        if (produto instanceof Error)
            throw new Error(produto.message);
        const deleted = yield prismaClient_1.default.produtos.delete({
            where: {
                id
            }
        });
        if (deleted)
            return deleted;
        throw new Error("Nao foi possivel deletar o produto");
    }
    catch (e) {
        if (e instanceof Error)
            return new Error(e.message);
        return new Error("Erro Desconhecido");
    }
});
exports.deleteProductModel = deleteProductModel;
const updateProductModel = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const produto = yield (0, exports.findProduct)("id", id);
        if (produto instanceof Error)
            throw new Error(produto.message);
        const updated = yield prismaClient_1.default.produtos.update({
            where: {
                id
            },
            data,
        });
        if (updated)
            return updated;
        throw new Error("Nao foi possivel atualizar o produto");
    }
    catch (e) {
        if (e instanceof Error)
            return new Error(e.message);
        return new Error("Erro Desconhecido");
    }
});
exports.updateProductModel = updateProductModel;
const getOneProductModel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const produto = yield (0, exports.findProduct)("id", id);
        if (produto instanceof Error)
            throw new Error(produto.message);
        return produto;
    }
    catch (e) {
        if (e instanceof Error)
            return new Error(e.message);
        return;
    }
});
exports.getOneProductModel = getOneProductModel;
