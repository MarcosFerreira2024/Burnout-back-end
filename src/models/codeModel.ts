import { Prisma } from "@prisma/client"
import prisma from "../lib/prismaClient"
import { findUserModel, updateUserModel } from "./userModel"

export const updateCodeModel = async (id: string, data: Prisma.codeUpdateInput) => {

    try {
        const updated = await prisma.code.update({
            where: {
                id
            },
            data,
            select: {
                id: true,
                userId: true,
                used: true,
                user: true
            }
        })
        if (updated) {
            return updated
        }
        throw new Error("Nao foi possivel atualizar o code")
    } catch (e) {
        if (e instanceof Error) {
            return e.message
        }
        return new Error("Erro Interno")

    }
}

export const deleteCodeModel = async (id: string) => {
    const deleted = await prisma.code.delete({
        where: {
            id
        }
    })
    if (deleted) {
        return deleted
    }
    return



}



export const findCodeModel = async (code: string) => {
    try {
        const codigo = await prisma.code.findUnique({
            where: {
                id: code
            },
            select: {
                id: true,
                userId: true,
                used: true,
                user: true
            }
        })
        if (codigo) {
            const findedUser = await findUserModel("email", codigo.user.email)


            if (findedUser instanceof Error) throw new Error(findedUser.message)
            await deleteCodeModel(codigo.id)
            await updateUserModel(findedUser.id, { status: true })

            return findedUser
        }
        throw new Error("Não foi possivel encontrar o codigo")
    }
    catch (e) {
        if (e instanceof Error) {
            return new Error(e.message)
        }
        return new Error("Erro Interno")
    }
}