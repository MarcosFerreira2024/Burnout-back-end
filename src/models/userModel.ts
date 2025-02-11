import { Prisma } from "@prisma/client"
import bcrypt from "bcrypt"
import prisma from "../lib/prismaClient"
import { handleCode } from "../services/createCode"

export const CreateUserModel = async (data: Prisma.usersCreateInput) => {
    //verificar se o usuário existe
    try {
        const user = await findUserModel("email", data.email)

        if (user instanceof Error && user.message === "Usuário não foi encontrado") {
            const salt = 10
            //criptografar a senha antes de mandar pro banco de dados
            const hashedPassword = await bcrypt.hash(data.password, salt) as unknown as string

            const createdUser = await prisma.users.create({
                data: {
                    ...data,
                    password: hashedPassword,
                    carrinho: {
                        create: {
                            cartItem: {
                                create: []
                            }
                        }
                    }


                },

                include: {
                    carrinho: {
                        include: {
                            cartItem: true
                        }
                    },
                    fav: true,
                    avaliacoes: true,
                    comments: true,
                    code: true,
                }


            })

            if (!createdUser) throw new Error("Ocorreu um erro ao criar o usuário")

            const code = await handleCode(createdUser)

            if (code instanceof Error) throw new Error(code.message)

            return code

        }

        throw new Error("Usuário ja existe")








    } catch (e) {
        if (e instanceof Error) {
            return new Error(e.message)
        }
        return new Error("Erro Desconhecido")
    }

}
//função para encontrar usuário
export const findUserModel = async (identificador: "id" | "email", value: string) => {
    try {
        const where = identificador === "id" ? { id: value } : identificador === "email" ? { email: value } : undefined
        if (!where) throw new Error("Chave Inválida para busca")
        const user = await prisma.users.findUnique({
            where,


            include: {
                carrinho: {
                    include: {
                        cartItem: true
                    }
                },
                fav: true,
                avaliacoes: true,
                comments: true,
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

            include: {
                carrinho: {
                    include: {
                        cartItem: true
                    }
                },
                fav: true,
                avaliacoes: true,
                comments: true,
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
        const user = await findUserModel("email", token.email)
        if (user instanceof Error) throw new Error(user.message)

        return user
    }
    catch (e) {
        if (e instanceof Error) return new Error(e.message)
        return new Error("Erro interno")
    }


}

export const getAllUsersModel = async () => {
    try {
        const users = await prisma.users.findMany({

            include: {
                carrinho: {
                    include: {
                        cartItem: true
                    }
                },
                fav: true,
                avaliacoes: true,
                comments: true,
                code: true,
            }
        })
        return users
    } catch (e) {
        if (e instanceof Error) return new Error(e.message)
        return new Error("Erro interno")
    }
}
