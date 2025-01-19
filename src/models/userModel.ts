import { Prisma } from "@prisma/client"
import bcrypt from "bcrypt"
import prisma from "../lib/prismaClient"
import { handleCode } from "../services/createCode"

export const CreateUserModel = async (data: Prisma.usersCreateInput) => {
    //verificar se o usuário existe
    try {
        const user = await findUserModel(data.email)

        if (user instanceof Error && user.message === "Usuário não foi encontrado") {
            const salt = 10
            //criptografar a senha antes de mandar pro banco de dados
            const hashedPassword = await bcrypt.hash(data.password, salt) as unknown as string

            const createdUser = await prisma.users.create({
                data: {
                    ...data,
                    password: hashedPassword,


                },

                select: {
                    id: true,
                    email: true,
                    password: true,
                    status: true,
                    code: true,
                    photo: true

                }

            })

            if (!createdUser) throw new Error("Ocorreu um erro ao criar o usuário")

            const code = await handleCode(createdUser)

            if (code instanceof Error) throw new Error(code.message)

            return code

        }

        if (user instanceof Error) throw new Error(user.message)

        if (user.status === true) throw new Error("O usuario já existe")

        const newCode = await handleCode(user)

        if (newCode instanceof Error) throw new Error(newCode.message)

        return newCode








    } catch (e) {
        if (e instanceof Error) {
            return new Error(e.message)
        }
        return new Error("Erro Desconhecido")
    }

}
//função para encontrar usuário
export const findUserModel = async (email: string) => {
    try {
        const user = await prisma.users.findUnique({
            where: {
                email
            },
            select: {
                id: true,
                email: true,
                photo: true,
                password: true,
                status: true,
                code: true,
            }

        })
        if (!user) throw new Error("Usuário não foi encontrado")
        return user

    } catch (e) {
        if (e instanceof Error) {
            return new Error(e.message)
        }
        return new Error("Erro Desconhecido")
    }
}


export const updateUserModel = async (id: string, data: Prisma.usersUpdateInput) => {

    try {
        const updated = await prisma.users.update({
            where: {
                id
            },
            data,
            select: {
                id: true,
                email: true,
                password: true,
                status: true,
                code: true,
            }
        })
        if (updated) {
            return updated
        }
        throw new Error("Nao foi possivel atualizar o usuario")
    } catch (e) {
        if (e instanceof Error) {
            return e.message
        }
        return new Error("Erro Interno")

    }
}


export const deleteUserModel = async (id: string) => {
    try {
        const deleted = await prisma.users.delete({
            where: {
                id
            }
        })
        if (deleted) {
            return deleted
        }
        throw new Error("Não foi possivel deletar o usuário")
    } catch (e) {
        if (e instanceof Error && e.message.includes("not found")) {
            throw new Error("Usuário Não existe")
        }
        throw new Error("Erro Interno")

    }


}

export const getUserModel = async (token: JWTPayloadToken) => {
    try {
        const user = await findUserModel(token.email)
        if (user instanceof Error) throw new Error(user.message)

        return user
    }
    catch (e) {
        if (e instanceof Error) return new Error(e.message)
        return new Error("Erro interno")
    }


}