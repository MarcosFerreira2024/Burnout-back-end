import { RequestHandler } from "express";
import { verifyJWT } from "../services/jwt";
import HTTP_STATUS from "../consts/HttpStatus";
import { findUserModel } from "../models/userModel";


export const authMiddleware: RequestHandler = async (req, res, next) => {

    //receber o token e ver se o usuário relacionado a ele já verificou o email
    try {
        if (!req.headers.authorization) throw new Error("Sem Token")

        const token = verifyJWT(req.headers.authorization)






        if (token instanceof Error) {

            res.status(HTTP_STATUS.UNAUTHORIZED).json({
                message: "Token Inválido"
            })
            return
        }




        next()
    } catch (e) {
        if (e instanceof Error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: e.message })
            return
        }

        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Erro Interno"
        })
        return
    }
}

export const adminMiddleware: RequestHandler = async (req, res, next) => {

    try {
        if (!req.headers.authorization) throw new Error("Sem Token")

        const token = verifyJWT(req.headers.authorization)

        if (token instanceof Error) {

            res.status(HTTP_STATUS.UNAUTHORIZED).json({
                message: "Token Inválido"
            })
            return
        }


        const finded = await findUserModel("email", token.email)

        if (finded instanceof Error) throw new Error(finded.message)

        if (finded.role !== "ADMIN") {
            res.status(HTTP_STATUS.FORBIDDEN).json({
                message: "ACESSO NEGADO"
            })
            return
        }
        next()

    } catch (e) {
        if (e instanceof Error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: e.message })
            return
        }

        return

    }

}