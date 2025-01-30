import prisma from "../lib/prismaClient"
import { addOrRemove, verifyDataFromCart } from "../services/cartService";
import { AddedOrRemovedProductFromCart, deletedProductFromCart } from "../types/cartTypes";

export const addOrIncrementProductInCartModel = async (user: string, product: string): Promise<Error | AddedOrRemovedProductFromCart> => {
    try {
        const data = await verifyDataFromCart(user, product)
        if (data instanceof Error) throw new Error(data.message)


        if (data) {
            const { findedUser, findedProduct } = data
            if (findedUser.carrinho) {
                const finded = findedUser.carrinho.cartItem.find((item) => item.productId === findedProduct.id)
                if (finded) {

                    const added = await addOrRemove(finded, "add") as AddedOrRemovedProductFromCart


                    return added

                }

                const produtoAdicionado = await prisma.cartItem.create({
                    data: { quantity: 1, productId: findedProduct.id, cartId: findedUser.carrinho.id },

                    select: {
                        quantity: true,
                        product: true
                    }
                })

                if (produtoAdicionado) return produtoAdicionado as AddedOrRemovedProductFromCart

            }
            const createdCart = await prisma.cart.upsert({
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
            if (createdCart instanceof Error) throw new Error("Não foi possivel Criar o Carrinho tente novamente")

            return createdCart.cartItem[0] as AddedOrRemovedProductFromCart

        }

        throw new Error("Erro Interno")



    }
    catch (e) {
        if (e instanceof Error) return new Error(e.message)

        return new Error("Erro Desconhecido")
    }

}

export const removeAllFromOneProductModel = async (user: string, product: string): Promise<Error | deletedProductFromCart> => {

    try {
        const data = await verifyDataFromCart(user, product)

        if (data instanceof Error) throw new Error(data.message)
        if (!data) throw new Error("Erro Interno")

        const { findedProduct, findedUser } = data

        if (findedUser.carrinho) {
            const finded = findedUser.carrinho.cartItem.find((item) => item.productId === findedProduct.id)
            if (finded) {
                const deleted = await prisma.cartItem.delete({
                    where: {
                        id: finded.id
                    }

                })
                return deleted
            }
        }
        throw new Error("Carrinho Vazio")

    } catch (e) {
        if (e instanceof Error) return new Error(e.message)
        return new Error("Erro Desconhecido")
    }

}

export const decrementOrRemoveProductFromCartModel = async (user: string, product: string): Promise<Error | AddedOrRemovedProductFromCart> => {
    try {
        const data = await verifyDataFromCart(user, product)
        if (data instanceof Error) throw new Error(data.message)


        if (data) {
            const { findedUser, findedProduct } = data

            if (findedUser.carrinho) {
                const finded = findedUser.carrinho.cartItem.find((item) => item.productId === findedProduct.id)
                if (finded) {

                    const added = await addOrRemove(finded, "remove") as AddedOrRemovedProductFromCart


                    return added

                }
            }
        }

        throw new Error("Produto Não Foi Encontrado")

    }
    catch (e) {
        if (e instanceof Error) return new Error(e.message)

        return new Error("Erro Desconhecido")
    }


}