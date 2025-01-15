import { RequestHandler } from "express";
import { verifyJWT } from "../services/jwt";
import HTTP_STATUS from "../consts/HttpStatus";

export const authMiddleware: RequestHandler = (req, res, next) => {

    //receber o token 
    const token = verifyJWT(req.headers.authorization ? req.headers.authorization : null)

    if (token instanceof Error) {

        res.status(HTTP_STATUS.UNAUTHORIZED).json({
            message: "Você precisa estar logado"
        })
        return
    }
    next()
}