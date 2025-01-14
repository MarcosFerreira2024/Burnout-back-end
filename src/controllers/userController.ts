import { RequestHandler } from "express";
import { loginSchema, registerUserSchema } from "../schemas/userSchema";
import HTTP_STATUS from "../consts/HttpStatus";
import { CreateUserModel, findUser, updateUser } from "../models/userModel";
import { sendVerificationCode } from "../services/sendVerificationCode";
import bcrypt from "bcrypt"
import { updateCode } from "../models/codeModel";
import { createJWT } from "../services/createJWT";

export const CreateUser: RequestHandler = async (req, res) => {

    // pegar os dados
    const dados = registerUserSchema.safeParse(req.body)

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

        // verificar se oq chegou foi um erro ou o usuario e retornar um json 
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

export const login: RequestHandler = async (req, res) => {

    //pegar os dados de email, senha e o codigo
    const dados = loginSchema.safeParse(req.body)

    if (dados.success) {
        try {
            const user = await findUser(dados.data.email)

            if (user && user.code && user.code.used === false) {
                //verificar se o email corresponde a um usuário, se a senha corresponde a senha do usuario no banco de dados e se o codigo é o msm q foi enviado para o email
                const comparedPassword = await bcrypt.compare(dados.data.password, user.password)
                const comparedCode = user.code?.id === req.body.code
                if (!comparedPassword) {
                    res.status(HTTP_STATUS.BAD_REQUEST).json({
                        message: "Dados Incorretos"
                    })
                    return
                }
                if (!comparedCode) {
                    res.status(HTTP_STATUS.BAD_REQUEST).json({
                        message: "Código Invalido"
                    })
                    return
                }
                //após verificar esses dados gerar um jwt com o email e o id do usuário e setar o status do usuário e do code para true
                const token = createJWT(user)
                res.status(HTTP_STATUS.OK).json({
                    token
                })
                const updatedUser = await updateUser(user.id, { status: true, })

                const updatedCode = await updateCode(user.code.id, { used: true, })

                res.status(HTTP_STATUS.OK).json({ updatedUser, updatedCode })
                return



            }
            if (user && user.status === true) {
                const token = createJWT(user)

                res.status(HTTP_STATUS.OK).json({
                    token
                })
                return
            }
            throw new Error("Usuário Nao Encontrado")
        } catch {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                message: "Erro interno"
            })
            return
        }
    }
    res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: dados.error?.flatten().fieldErrors
    })
    return





}

