import { RequestHandler } from "express";
import { verifyJWT } from "../services/jwt";
import HTTP_STATUS from "../consts/HttpStatus";
import { findUserModel } from "../models/userModel";

export const authMiddleware: RequestHandler = async (req, res, next) => {

    //receber o token e ver se o usuário relacionado a ele já verificou o email
    try {
        const token = verifyJWT(req.headers.authorization ? req.headers.authorization : null) as JWTPayloadToken




        if (token instanceof Error && token === undefined) {

            res.status(HTTP_STATUS.UNAUTHORIZED).json({
                message: "Você precisa estar logado"
            })
            return
        }

        next()
    } catch (e) {
        if (e instanceof Error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: e.message
            })
            return
        }
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Erro Interno"
        })
        return
    }
}