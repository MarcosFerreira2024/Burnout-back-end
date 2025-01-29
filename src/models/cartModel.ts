import prisma from "../lib/prismaClient"
import { findProduct } from "./productModel"
import { findUserModel } from "./userModel"

export const addToCartModel = async (user: string, product: string) => {
    try {
        const findedUser = await findUserModel("id", user)
        const findedProduct = await findProduct("id", product)
        if (findedUser instanceof Error) throw new Error(findedUser.message)

        if (findedProduct instanceof Error) throw new Error(findedProduct.message)

        if (findedUser.carrinho) {
            const finded = findedUser.carrinho.cartItem.find((item) => item.productId === findedProduct.id)
            if (finded) {
                const updated = await prisma.cartItem.update({
                    where: {
                        id: finded.id
                    },
                    data: {
                        quantity: finded.quantity + 1
                    },
                    select: {
                        quantity: true,
                        product: true


                    },

                })

                return updated

            }

            const produtoAdicionado = await prisma.cartItem.create({ data: { quantity: 1, productId: findedProduct.id, cartId: findedUser.carrinho.id } })

            return produtoAdicionado
        }
        const createCart = await prisma.cart.create({
            data: {
                userId: findedUser.id,
                cartItem: {

                    create: [
                        {

                            productId: findedProduct.id,
                            quantity: 1

                        }
                    ]

                }

            },
            include: {
                user: true
            }

        })
        return createCart








    }
    catch (e) {
        if (e instanceof Error) return new Error(e.message)
    }
}