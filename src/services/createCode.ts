import prisma from "../lib/prismaClient";

export async function createToken(user: createCode) {
    //verifica se existe o user.code
    try {
        if (user.code && user.code.used === false) {
            const code = await prisma.code.findUnique({
                where: {
                    id: user.code.id
                },
                select: {
                    id: true,
                    expiresAt: true,
                    used: true,

                }
            })
            if (code && code.expiresAt < new Date()) {
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
            if (user.code.expiresAt > new Date()) {

                throw new Error("Verifique seu email")

            }
        }

        const code = await ValidationCode(user)
        if (!(code instanceof Error)) {
            return { email: user.email, code: code.id }
        }
        throw new Error(code.message)
    } catch (e) {
        if (e instanceof Error) {
            throw new Error(e.message)
        }
        throw new Error("Erro Desconhecido")
    }


}

export const ValidationCode = async (user: createCode) => {
    const code = await createVerificationCode(user)

    if (!(code instanceof Error)) {
        return code
    }
    throw new Error(code.message)
}



export async function createVerificationCode(user: createCode) {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1)
    try {
        const code = await prisma.code.create({
            data: {
                userId: user.id,
                used: false,
                expiresAt,
            },
            select: {
                id: true,
                used: true
            }


        })
        return code
    } catch {
        throw new Error("Não foi possivel gerar um código")

    }


}



