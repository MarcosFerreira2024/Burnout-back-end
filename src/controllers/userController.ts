import { RequestHandler } from "express"
import { loginSchema, registerUserSchema, updateSchema } from "../schemas/userSchema"
import HTTP_STATUS from "../consts/HttpStatus"
import { CreateUserModel, deleteUserModel, findUserModel, getAllUsersModel, getUserModel, updateUserModel } from "../models/userModel"
import { sendVerificationCode } from "../services/sendVerificationCode"
import { validatePasswordToCreateJWT, verifyJWT } from "../services/jwt"
import { deleteCodeModel } from "../models/codeModel"
import { handleCode } from "../services/createCode"
import bcrypt from "bcrypt"

export const CreateUser: RequestHandler = async (req, res) => {

    // pegar os dados
    if (req.body.role) {
        res.status(HTTP_STATUS.FORBIDDEN).json({ msg: "ACESSO NEGADO" })
        return
    }

    const dados = registerUserSchema.safeParse(req.body)

    // verificar os dados
    if (dados.error) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: dados.error?.issues[0].message
        })
        return
    }
    // mandar os dados pro model
    try {
        const { confirmPassword, ...data } = dados.data

        const user = await CreateUserModel(data)

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
            return
        }


    }
    catch (e) {
        if (e instanceof Error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: e.message
            })
            return
        }
        return
    }






}

export const login: RequestHandler = async (req, res) => {

    //pegar os dados de email, senha e o codigo
    const validation = loginSchema.safeParse(req.body)

    if (validation.success) {
        try {
            const user = await findUserModel("email", validation.data.email)

            if (user instanceof Error) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: user.message })
                return
            }
            if (user.status === true) {
                const jwt = await validatePasswordToCreateJWT(validation.data.password, user)
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

            const comparedPassword = await bcrypt.compare(req.body.password, user.password)

            if (!comparedPassword) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Senha Incorreta" })
                return
            }

            const code = await handleCode(user)

            if (code instanceof Error) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ message: code.message })
                return
            }

            if (code.email) {
                const email = await sendVerificationCode(code.email, code.code as string)
                res.status(HTTP_STATUS.OK).json({
                    message: email
                })
                return
            }

            res.status(HTTP_STATUS.OK).json({
                message: "Insira o código que foi enviado ao seu email",
            })
            return





        } catch {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                message: "Erro interno"
            })
            return
        }
    }
    res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: validation.error?.issues[0].message
    })
    return





}

export const deleteUser: RequestHandler = async (req, res) => {

    //receber o token 
    try {
        if (!req.headers.authorization) throw new Error("Sem token")

        const validatedToken = verifyJWT(req.headers.authorization) as JWT

        if (validatedToken instanceof Error) {
            throw new Error(validatedToken.message)
        }

        const deleted = await deleteUserModel(validatedToken.id as string)

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
        return
    }
}

export const deleteAnyUser: RequestHandler = async (req, res) => {
    const id = req.params.id
    try {
        const deleted = await deleteUserModel(id)
        if (deleted instanceof Error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: deleted.message
            })
            return
        }
        res.status(HTTP_STATUS.OK).json({
            message: deleted
        })
        return
    } catch (e) {
        if (e instanceof Error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: e.message
            })
            return
        }
        return
    }
}


export const getUser: RequestHandler = async (req, res) => {
    //pegar o token

    if (!req.headers.authorization) throw new Error("Sem Token")
    try {
        const token = verifyJWT(req.headers.authorization)


        if (token instanceof Error) throw new Error(token.message)

        const user = await getUserModel(token)


        if (user instanceof Error) throw new Error(user.message)

        res.status(HTTP_STATUS.OK).json(
            user
        )
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

export const getAllUsers: RequestHandler = async (req, res) => {

    try {
        const users = await getAllUsersModel()

        if (users instanceof Error) throw new Error(users.message)

        res.status(HTTP_STATUS.OK).json(users)
        return
    } catch (e) {
        if (e instanceof Error) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({ message: e.message })
            return
        }
        return
    }
}

export const updateUser: RequestHandler = async (req, res) => {
    const token = req.headers.authorization

    if (token) {
        try {
            const { email, id } = verifyJWT(token) as JWT

            const finded = await findUserModel("email", email)

            if (finded instanceof Error) throw new Error(finded.message)

            if (req.body.role && finded.role !== "ADMIN") {
                res.status(HTTP_STATUS.FORBIDDEN).json({ msg: "ACESSO NEGADO" })

                return
            }


            const validatedData = updateSchema.safeParse(req.body)

            if (validatedData.error) {
                res.status(HTTP_STATUS.BAD_REQUEST).json(validatedData.error.flatten().fieldErrors)
                return
            }
            const updatedUser = await updateUserModel(id, validatedData.data)

            if (updatedUser instanceof Error) throw new Error(updatedUser.message)

            res.status(HTTP_STATUS.OK).json(updatedUser)
            return

        } catch (e) {
            if (e instanceof Error) {
                res.status(HTTP_STATUS.BAD_REQUEST).json({ msg: e.message })
                return
            }

            return
        }
    }


}