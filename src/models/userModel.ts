import { Prisma } from "@prisma/client";
import prisma from "../lib/prismaClient";
import bcrypt from "bcrypt"
import ValidationCode from "../services/createCode";

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
                    code: true,

                }

            })

            if (!createdUser) {
                throw new Error("Ocorreu um erro ao criar o usuário")
            }
            const code = await ValidationCode(createdUser)
            if (!(code instanceof Error)) {
                return { email: createdUser.email, code: code.id }
            }
            throw new Error(code.message)
        }
        //verificar se o usuário tem um código expirado
        if (user && user.code) {
            if (user.code.expiresAt > new Date()) {
                throw new Error("Já tem um código de verificação")
            }
            //deletar o código expirado
            if (user.code.expiresAt < new Date()) {
                const deleteCode = await prisma.code.delete({
                    where: {
                        id: user.code.id
                    }
                })
                //criar novo código
                if (deleteCode) {
                    const code = await ValidationCode(user)

                    if (!(code instanceof Error)) {
                        return { email: user.email, code: code.id }
                    }
                    throw new Error(code.message)

                }
                throw new Error("Erro Interno")
            }

        }

    }
    catch (e) {
        if (e instanceof Error) {
            throw new Error(e.message)
        }
        throw new Error("Erro desconhecido")
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