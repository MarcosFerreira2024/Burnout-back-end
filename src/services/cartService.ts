import { cartItem } from "@prisma/client"
import prisma from "../lib/prismaClient"
import { findUserModel } from "../models/userModel"
import { findProduct } from "../models/productModel"

export const addOrRemove = async (finded: cartItem, operation: "add" | "remove") => {

    try {
        if (operation === "remove") {
            const findedCartItemQuantity = await prisma.cartItem.findUnique({
                where: {
                    id: finded.id
                },
                select: {
                    quantity: true
                }
            })
            if (findedCartItemQuantity instanceof Error) throw new Error(findedCartItemQuantity.message)

            if (findedCartItemQuantity) {
                if (findedCartItemQuantity.quantity === 1) {
                    await prisma.cartItem.delete({
                        where: {
                            id: finded.id

                        }

                    })

                    return "Produto Deletado do Carrinho"

                }

            }
        }
        const updated = await prisma.cartItem.update({
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
        })
        return updated
    } catch (e) {
        if (e instanceof Error) return new Error(e.message)
    }

}

export const verifyDataFromCart = async (user: string, product: string) => {
    try {
        const findedUser = await findUserModel("id", user)
        const findedProduct = await findProduct("id", product)
        if (!findedProduct && !findedUser) throw new Error("Erro Interno")

        if (findedUser instanceof Error) throw new Error(findedUser.message)

        if (findedProduct instanceof Error) throw new Error(findedProduct.message)

        return { findedUser, findedProduct }
    } catch (e) {
        if (e instanceof Error) return new Error(e.message)
        return new Error("Erro Desconhecido")
    }

}


export const cartOperations = async<T>(user: string, product: string, operation: (user: string, product: string) => Promise<T | Error>) => {

    try {

        if (!user || !product) throw new Error("Dados invalidos")

        const result = await operation(user, product)

        if (result instanceof Error) throw new Error(result.message)
        if (!result) throw new Error("Erro Interno")
        return result

    } catch (e) {

        if (e instanceof Error) return new Error(e.message)

        return new Error("Erro Interno")
    }

}