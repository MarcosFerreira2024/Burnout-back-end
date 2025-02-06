import { RequestHandler } from "express";
import HTTP_STATUS from "../consts/HttpStatus";
import { productSchema } from "../schemas/productSchema";
import { createProductModel, deleteProductModel, getAllProductsModel, getOneProductModel, updateProductModel } from "../models/productModel";

export const createProduct: RequestHandler = async (req, res) => {


    const validatedData = productSchema.safeParse(req.body)
    try {
        if (validatedData.success) {
            const created = await createProductModel(validatedData.data)
            if (created instanceof Error) throw new Error(created.message)
            res.status(HTTP_STATUS.OK).json(created)
            return
        }
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: validatedData.error?.issues[0].message })
        return

    }
    catch (e) {
        if (e instanceof Error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: e.message })
            return
        }

        return

    }


}

export const getAllProducts: RequestHandler = async (req, res) => {


    try {
        const products = await getAllProductsModel(req.query.name as string, req.query.page as string,)
        if (products instanceof Error) throw new Error(products.message)

        res.status(HTTP_STATUS.OK).json(products)
        return


    } catch (e) {
        if (e instanceof Error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: e.message })
        }
        return
    }
}

export const deleteProduct: RequestHandler = async (req, res) => {
    const id = req.params.id
    try {
        const deleted = await deleteProductModel(id)
        if (deleted instanceof Error) throw new Error(deleted.message)
        res.status(HTTP_STATUS.OK).json(deleted)
        return
    } catch (e) {
        if (e instanceof Error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: e.message })
            return
        }
        return
    }
}

export const updateProduct: RequestHandler = async (req, res) => {

    const id = req.params.id

    const data = productSchema.partial().safeParse(req.body)

    try {
        if (data.error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json(data.error.flatten().fieldErrors)
            return
        }
        if (req.body.length === 0 || id.length === 0) throw new Error("Dados para atualização não foram encontrados")

        const updated = await updateProductModel(id, data.data)
        if (updated instanceof Error) throw new Error(updated.message)
        res.status(HTTP_STATUS.OK).json(updated)
        return

    } catch (e) {
        if (e instanceof Error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: e.message })
            return
        }
        return

    }


}

export const getOneProduct: RequestHandler = async (req, res) => {

    const id = req.params.id

    try {
        const produto = await getOneProductModel(id)
        if (produto instanceof Error) throw new Error(produto.message)
        res.status(HTTP_STATUS.OK).json(produto)
    } catch (e) {
        if (e instanceof Error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: e.message })
            return
        }
        return

    }

}