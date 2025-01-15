import { Prisma } from "@prisma/client"
import prisma from "../lib/prismaClient"

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
        throw new Error("Erro Interno")

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