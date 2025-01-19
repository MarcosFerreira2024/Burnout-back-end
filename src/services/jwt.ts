import JWT from "jsonwebtoken"
import bcrypt from "bcrypt"


export function createJWT(user: JWT) {
    const token = JWT.sign({ email: user.email, id: user.id }, process.env.MY_SECRET_KEY as string)
    return token
}

export async function validatePasswordToCreateJWT(password: string, user: CompareJWT) {
    try {
        const comparedPassword = await bcrypt.compare(password, user.password)
        if (!comparedPassword) {
            throw new Error("Senha Incorreta")

        }
        const token = createJWT(user)

        return token

    }
    catch (e) {
        if (e instanceof Error) {
            return new Error(e.message)
        }
        return new Error("Erro Interno")

    }

}

export function verifyJWT(authorization: string) {
    try {
        const token = authorization.split(" ")[1]

        const validatedToken = JWT.verify(token, process.env.MY_SECRET_KEY as string)

        if (typeof validatedToken === "string") {
            throw new Error("Token inválido")
        }

        return validatedToken as JWT



    } catch (e) {
        if (e instanceof Error) {
            return new Error(e.message)
        }
        return new Error("Erro Interno")
    }



}