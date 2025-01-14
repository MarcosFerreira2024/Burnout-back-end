import JWT from "jsonwebtoken"



export function createJWT(user: JWT) {
    const token = JWT.sign({ email: user.email, id: user.id }, process.env.MY_SECRET_KEY as string)
    return token
}