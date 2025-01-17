import { RequestHandler } from "express";
import { codeSchema } from "../schemas/codeSchema";
import { createJWT } from "../services/jwt";
import HTTP_STATUS from "../consts/HttpStatus";
import { findCodeModel } from "../models/codeModel";

export const verifyCode: RequestHandler = async (req, res) => {
    //pegar o req.body.code
    try {
        const data = codeSchema.safeParse(req.body.code)
        if (data.success) {
            const finded = await findCodeModel(data.data)

            if (finded instanceof Error) res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Codigo nao encontrado" })

            const token = createJWT(finded as JWT)


            res.status(HTTP_STATUS.OK).json({ token })
            return


        }
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: data
        })
        return
    } catch (e) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: e

        })
        return
    }

}