import { RequestHandler } from "express";
import HTTP_STATUS from "../consts/HttpStatus";
import { addOrIncrementProductInCartModel, decrementOrRemoveProductFromCartModel, removeAllFromOneProductModel } from "../models/CartModel";
import { cartOperations } from "../services/cartService";
import { AddedOrRemovedProductFromCart, deletedProductFromCart } from "../types/cartTypes";

export const addOrIncrementProductInCart: RequestHandler = async (req, res) => {

    const user = req.params.userId

    const product = req.params.produtoId

    try {


        const added = await cartOperations<AddedOrRemovedProductFromCart>(user, product, addOrIncrementProductInCartModel)

        if (added instanceof Error) throw new Error(added.message)

        res.status(HTTP_STATUS.OK).json(added)

        return




    } catch (e) {
        if (e instanceof Error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: e.message })
            return
        }
        return
    }


}



export const removeAllFromOneProduct: RequestHandler = async (req, res) => {

    const user = req.params.userId

    const product = req.params.produtoId

    try {


        const removed = await cartOperations<deletedProductFromCart>(user, product, removeAllFromOneProductModel)

        if (removed instanceof Error) throw new Error(removed.message)

        res.status(HTTP_STATUS.OK).json(removed)
        return




    } catch (e) {
        if (e instanceof Error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: e.message })
            return
        }
        return
    }
}

export const decrementOrRemoveProductFromCart: RequestHandler = async (req, res) => {
    const user = req.params.userId

    const product = req.params.produtoId

    try {

        if (!user || !product) throw new Error("Dados invalidos")

        const decrementedOrRemoved = await decrementOrRemoveProductFromCartModel(user, product)

        if (decrementedOrRemoved instanceof Error) throw new Error(decrementedOrRemoved.message)

        res.status(HTTP_STATUS.OK).json(decrementedOrRemoved)

        return

    } catch (e) {

        if (e instanceof Error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: e.message })

            return
        }
        return
    }
}




