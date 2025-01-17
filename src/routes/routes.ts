import { Router } from "express"
import { CreateUser, deleteUser, login } from "../controllers/userController"
import { authMiddleware } from "../middlewares/authMiddleware"
import { verifyCode } from "../controllers/codeController"


const route = Router()

route.get("/api/routes", (req, res) => { // listar todas as rotas
    res.status(200).json({
        rotas: [
            {
                GET: [

                ]
            },
            {
                POST: [

                ]
            },
            {
                UPDATE: [

                ]
            },
            {
                DELETE: [

                ]
            }
        ]
    })

})

route.post("/api/sign", CreateUser)

route.post("/api/code", verifyCode)

route.post("/api/login", login)

route.delete("/api/user", authMiddleware, deleteUser)


export default route