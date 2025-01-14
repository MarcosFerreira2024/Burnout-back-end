import prisma from "../lib/prismaClient";

const ValidationCode = async (user: createCode) => {
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
                id: true
            }


        })
        return code
    } catch {
        throw new Error("Não foi possivel gerar um código")

    }


}



export default ValidationCode


