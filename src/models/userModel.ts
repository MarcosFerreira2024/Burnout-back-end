import { Prisma } from "@prisma/client";
import prisma from "../lib/prismaClient";
import bcrypt from "bcrypt"
import { createToken } from "../services/createCode";

export const CreateUserModel = async (data: Prisma.usersCreateInput) => {
    //verificar se o usuário existe
    try {
        const user = await findUser(data.email)
        if (!user) {
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

                }

            })

            if (!createdUser) {
                throw new Error("Ocorreu um erro ao criar o usuário")
            }
            const code = await createToken(createdUser)
            return code
        }
        if (user.status === true) {
            throw new Error("O usuario já existe")
        }
        const newCode = await createToken(user)
        return newCode

    } catch (e) {
        if (e instanceof Error) {
            throw new Error(e.message)
        }
        throw new Error("Erro Desconhecido")
    }
}
//função para encontrar usuário
export const findUser = async (email: string) => {
    try {
        const user = await prisma.users.findUnique({
            where: {
                email
            },
            select: {
                id: true,
                email: true,
                password: true,
                status: true,
                code: true,
            }

        })
        return user
    } catch (e) {
        if (e instanceof Error) {
            throw new Error(e.message)
        }
        throw new Error("Erro Desconhecido")
    }
}


export const updateUser = async (id: string, data: Prisma.usersUpdateInput) => {

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
        throw new Error("Erro Interno")

    }
}