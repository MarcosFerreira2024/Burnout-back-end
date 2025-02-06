import { Prisma } from "@prisma/client";
import prisma from "../lib/prismaClient";
import { findUserModel, getAllUsersModel } from "./userModel";

export const createProductModel = async (data: Prisma.produtosCreateInput) => {
    try {
        if (data) {
            const verificaExistente = await findProduct("name", data.name)

            if (verificaExistente instanceof Error) {

                const created = await prisma.produtos.create({
                    data,


                })
                if (created) return created

                throw new Error("Erro Interno")


            }
            throw new Error("Produto já existe")
        }
        throw new Error("Nao foi possivel criar o produto")

    } catch (e) {
        if (e instanceof Error) return new Error(e.message)
        return new Error("Erro Desconhecido")

    }


}

export const findProduct = async (identificador: "id" | "name", value: string) => {
    try {

        const where = identificador === "id" ? { id: value } : identificador === "name" ? { name: value } : undefined

        if (!where) throw new Error("Chave inválida para busca")

        const produtoEncontrado = await prisma.produtos.findUnique({
            where

        })

        if (!produtoEncontrado) return new Error("Produto não foi encontrado")

        return produtoEncontrado
    } catch (e) {
        if (e instanceof Error) {
            if (e.message.includes("not found")) return new Error("Produto não foi encontrado")
            return new Error(e.message)
        }
        return new Error("Erro Desconhecido")


    }
}

export const getAllProductsModel = async (name?: string, page?: string) => {
    if (page === undefined) page = "1";

    const take = 20

    try {
        let whereCondition = {};

        if (name && name !== "Produtos") {
            whereCondition = {
                OR: [
                    { name: { contains: name } },
                    { category: { has: name } }
                ]
            };
        }

        const totalProducts = await prisma.produtos.count({
            where: whereCondition
        });

        // Buscar os produtos paginados
        const produtos = await prisma.produtos.findMany({
            where: whereCondition,
            take: take,
            skip: (parseInt(page) - 1) * take
        });

        if (produtos) {
            return {
                produtos,
                totalProducts,
                totalPages: Math.ceil(totalProducts / take)
            };
        }

        throw new Error("Não foi possível encontrar os produtos");

    } catch (e) {
        if (e instanceof Error) return new Error(e.message);
        return new Error("Erro Desconhecido");
    }
};


export const deleteProductModel = async (id: string) => {
    try {
        const produto = await findProduct("id", id)
        const users = await getAllUsersModel()
        if (users instanceof Error) throw new Error(users.message)
        if (produto instanceof Error) throw new Error(produto.message)
        for (const user of users) {
            if (user.carrinho?.cartItem.find(item => item.productId === produto.id)) {
                await prisma.cartItem.deleteMany({
                    where: {
                        productId: produto.id,
                        cartId: user.carrinho.id
                    }
                });
            }
        }



        const deleted = await prisma.produtos.delete({
            where: {
                id
            }
        })
        if (deleted) return deleted
        throw new Error("Nao foi possivel deletar o produto")
    } catch (e) {
        if (e instanceof Error) return new Error(e.message)
        return new Error("Erro Desconhecido")
    }
}

export const updateProductModel = async (id: string, data: Prisma.produtosUpdateInput) => {
    try {
        const produto = await findProduct("id", id)
        if (produto instanceof Error) throw new Error(produto.message)
        const updated = await prisma.produtos.update({
            where: {
                id
            },
            data,

        })
        if (updated) return updated
        throw new Error("Nao foi possivel atualizar o produto")
    } catch (e) {
        if (e instanceof Error) return new Error(e.message)
        return new Error("Erro Desconhecido")
    }
}

export const getOneProductModel = async (id: string) => {
    try {
        const produto = await findProduct("id", id)
        if (produto instanceof Error) throw new Error(produto.message)
        return produto
    } catch (e) {
        if (e instanceof Error) return new Error(e.message)
        return
    }
}