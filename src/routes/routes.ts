import { Router } from "express"
import { CreateUser, deleteUser, getUser, login } from "../controllers/userController"
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

route.get("/api/user", authMiddleware, getUser)

route.post("/api/login", login)









route.delete("/api/user", authMiddleware, deleteUser)

route.post("/api/produtos", authMiddleware, adminMiddleware, createProduct)

route.put("/api/produto:id", authMiddleware, adminMiddleware, updateProduct)

route.delete("/api/produto:id", authMiddleware, adminMiddleware, deleteProduct)






route.post("/api/cart:produtoId", authMiddleware, addToCart)

route.delete("/api/cart:produtoId", authMiddleware, removeFromCart)

route.put("/api/cart:produtoId", authMiddleware, updateFromCart)

export default route