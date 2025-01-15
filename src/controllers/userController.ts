import { RequestHandler } from "express";
import { loginSchema, registerUserSchema } from "../schemas/userSchema";
import HTTP_STATUS from "../consts/HttpStatus";
import { sendVerificationCode } from "../services/sendVerificationCode";
import bcrypt from "bcrypt"
import JWT, { JwtPayload, verify } from "jsonwebtoken"
import { createJWT, validatePasswordToCreateJWT, verifyJWT } from "../services/jwt";
import { CreateUserModel, deleteUserModel, findUserModel, updateUserModel } from "../models/userModel";
import { deleteCodeModel, updateCodeModel } from "../models/codeModel";
import { string } from "zod";

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
        return


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
    const partialValidation = loginSchema.omit({ code: true }).safeParse(req.body)

    if (partialValidation.success) {
        try {
            const user = await findUserModel(partialValidation.data.email)
            if (!user) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    message: "Usuário não existe, registre-se"
                })
                return
            }
            if (user && user.status === true) {
                const jwt = await validatePasswordToCreateJWT(partialValidation.data.password, user)
                if (jwt instanceof Error) {
                    res.status(HTTP_STATUS.BAD_REQUEST).json({
                        message: jwt.message
                    })
                    return

                }
                if (user.code) {
                    await deleteCodeModel(user.code?.id as string)
                }
                res.status(HTTP_STATUS.OK).json({
                    token: jwt
                })
                return

            }

            const fullValidation = loginSchema.safeParse(req.body)
            if (fullValidation.error) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    message: fullValidation.error.flatten().fieldErrors
                })
                return
            }
            if (user.code && user.code.used === false) {
                //verificar se o email corresponde a um usuário, se a senha corresponde a senha do usuario no banco de dados e se o codigo é o msm q foi enviado para o email
                const comparedCode = user.code?.id === req.body.code
                if (!comparedCode) {
                    res.status(HTTP_STATUS.BAD_REQUEST).json({
                        message: "Código Invalido"
                    })
                    return
                }
                const token = await validatePasswordToCreateJWT(fullValidation.data.password, user)
                if (token) {

                    await updateUserModel(user.id, { status: true, })

                    await updateCodeModel(user.code.id, { used: true, })

                    res.status(HTTP_STATUS.OK).json({
                        token
                    })
                    return
                }
                res.status(HTTP_STATUS.BAD_REQUEST).json({
                    message: "Senha Incorreta"
                })
                return



            }





        } catch {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                message: "Erro interno"
            })
            return
        }
    }
    res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: partialValidation.error?.flatten().fieldErrors
    })
    return





}

export const deleteUser: RequestHandler = async (req, res) => {

    //receber o token 
    try {
        const validatedToken = verifyJWT(req.headers.authorization ? req.headers.authorization : null)

        if (validatedToken instanceof Error) {
            throw new Error(validatedToken.message)
        }

        const { id } = validatedToken as JwtPayload
        const deleted = await deleteUserModel(id)

        if (deleted instanceof Error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: deleted.message
            })
            return
        }
        res.status(HTTP_STATUS.OK).json({
            message: "Usuário deletado com sucesso"
        })
        return





    } catch (e) {
        if (e instanceof Error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: e.message
            })
            return
        }

    }
}






