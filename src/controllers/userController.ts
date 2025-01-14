import { RequestHandler } from "express";
import { userSchema } from "../schemas/userSchema";
import HTTP_STATUS from "../consts/HttpStatus";
import { CreateUserModel } from "../models/userModel";
import { sendVerificationCode } from "../services/sendVerificationCode";
import createCode from "../services/createCode";

export const CreateUser: RequestHandler = async (req, res) => {

    // pegar os dados
    const dados = userSchema.safeParse(req.body)

    // verificar os dados
    if (dados.error) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: dados.error.flatten().fieldErrors
        })
        return
    }
    // mandar os dados pro model
    try {
        const { confirmPassword, ...data } = dados.data

        const user = await CreateUserModel(data)

        // verificar se oq chegou foi um erro ou o usuario e retornar um json com um erro ou com o usuario
        if (user instanceof Error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: user.message
            })
            return

        }
        if (!user) {
            throw new Error("Erro Interno")
        }

        const email = await sendVerificationCode(user.email, user.code)

        if (email) {
            res.status(HTTP_STATUS.OK).json({
                message: "Código Enviado para o Email"
            })
        }


    }
    catch (e) {
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

export const verifyUser: RequestHandler = (req, res) => {

    //pegar os dados de email, senha e o codigo

}