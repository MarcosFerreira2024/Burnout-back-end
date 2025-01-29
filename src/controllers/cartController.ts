import { RequestHandler } from "express";
import HTTP_STATUS from "../consts/HttpStatus";
import { addToCartModel } from "../models/CartModel";

export const addToCart: RequestHandler = async (req, res) => {
    const user = req.params.userId
    const product = req.params.produtoId


    if (user && product) {
        const added = await addToCartModel(user, product)

        if (added instanceof Error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: added.message })
            return
        }

        res.status(HTTP_STATUS.OK).json(added)
        return

    }
    res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Dados invalidos" })
}