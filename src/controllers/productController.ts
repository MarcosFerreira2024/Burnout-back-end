import { RequestHandler } from "express";
import HTTP_STATUS from "../consts/HttpStatus";
import { createProductModel, getAllProductsModel } from "../models/productModel";
import { productSchema } from "../schemas/productSchema";

export const createProduct: RequestHandler = async (req, res) => {


    const validatedData = productSchema.safeParse(req.body)
    try {
        if (validatedData.success) {
            const created = await createProductModel(validatedData.data)
            if (created instanceof Error) throw new Error(created.message)
            res.status(HTTP_STATUS.OK).json(created)
            return
        }
        res.status(HTTP_STATUS.BAD_REQUEST).json(validatedData.error.flatten().fieldErrors)
        return

    }
    catch (e) {
        if (e instanceof Error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: e.message })
            return
        }

        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Erro Interno" })
        return

    }


}

export const getAllProducts: RequestHandler = async (req, res) => {

    try {
        const products = await getAllProductsModel()
        if (products instanceof Error) throw new Error(products.message)

        res.status(HTTP_STATUS.OK).json(products)
        return


    } catch (e) {
        if (e instanceof Error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: e.message })
        }
    }
}
