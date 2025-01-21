import { Prisma } from "@prisma/client";
import prisma from "../lib/prismaClient";

export const createProductModel = async (data: Prisma.produtosCreateInput) => {
    try {
        if (data) {
            const verificaExistente = await findProductByName(data.name)

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

export const findProductByName = async (name: string) => {
    try {
        const produtoEncontrado = await prisma.produtos.findUnique({
            where: {
                name
            },

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

export const getAllProductsModel = async () => {
    try {
        const produtos = await prisma.produtos.findMany({})
        if (produtos) return produtos
        throw new Error("Nao foi possivel encontrar os produtos")
    } catch (e) {
        if (e instanceof Error) return new Error(e.message)
        return new Error("Erro Desconhecido")
    }
}
