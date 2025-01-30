import { Router } from "express"
import { CreateUser, deleteUser, getAllUsers, getUser, login, updateUser } from "../controllers/userController"
import { adminMiddleware, authMiddleware } from "../middlewares/Middleware"
import { verifyCode } from "../controllers/codeController"
import { createProduct, deleteProduct, getAllProducts, getOneProduct, updateProduct } from "../controllers/productController"
import { addOrIncrementProductInCart, decrementOrRemoveProductFromCart, removeAllFromOneProduct } from "../controllers/CartController"


const route = Router()

route.get("/api/routes", (req, res) => { // listar todas as rotas
    res.status(200).json({
        rotas: [
            {
                GET: [
                    "/api/ping",
                    "/api/produtos",
                    "/api/user",
                    "/api/produto:id",

                ]
            },
            {
                POST: [
                    "/api/sign",
                    "/api/login",
                    "/api/code",
                    "/api/produto",


                ]
            },
            {
                UPDATE: [
                    "/api/produto:id",

                ]
            },
            {
                DELETE: [
                    "/api/produto:id",
                    "/api/user"
                ]
            }
        ]
    })

})

route.post("/api/sign", CreateUser)

route.get("/api/users", authMiddleware, adminMiddleware, getAllUsers)

route.get("/api/user", authMiddleware, getUser)

route.post("/api/login", login)

route.delete("/api/user", authMiddleware, deleteUser)

route.delete("/api/user/:id", authMiddleware, adminMiddleware, deleteUser)

route.put("/api/user", authMiddleware, updateUser)



route.post("/api/code", verifyCode)





route.post("/api/produto", authMiddleware, adminMiddleware, createProduct)

route.get("/api/produtos", getAllProducts)

route.get("/api/produto/:id", getOneProduct)

route.delete("/api/produto/:id", authMiddleware, adminMiddleware, deleteProduct)

route.put("/api/produto/:id", authMiddleware, adminMiddleware, updateProduct)





route.post("/api/user/:userId/cart/:produtoId", authMiddleware, addOrIncrementProductInCart)

route.delete("/api/user/:userId/cart/:produtoId", authMiddleware, removeAllFromOneProduct)

route.get("/api/user/:userId/cart/", authMiddleware, getOneProduct)

route.put("/api/user/:userId/cart/:produtoId", authMiddleware, decrementOrRemoveProductFromCart)

export default route