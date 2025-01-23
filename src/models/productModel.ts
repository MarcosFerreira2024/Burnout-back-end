import { Prisma } from "@prisma/client";
import prisma from "../lib/prismaClient";

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

export const getAllProductsModel = async (name?: string) => {

    console.log(name)
    try {
        if (name) {
            if (name === "Produtos") {
                const produtos = await prisma.produtos.findMany({})
                if (produtos) return produtos
            }
            const produtos = await prisma.produtos.findMany({
                where: {
                    category: {
                        has: name

                    },


                }
            })
            if (produtos) return produtos
            throw new Error("Nao foi possivel encontrar os produtos")
        }
        throw new Error("Nao foi possivel encontrar os produtos")


    } catch (e) {
        if (e instanceof Error) return new Error(e.message)
        return new Error("Erro Desconhecido")
    }
}


export const deleteProductModel = async (id: string) => {
    try {
        const produto = await findProduct("id", id)
        if (produto instanceof Error) throw new Error(produto.message)
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