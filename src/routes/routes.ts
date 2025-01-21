import { Router } from "express"
import { CreateUser, deleteUser, getUser, login } from "../controllers/userController"
import { authMiddleware } from "../middlewares/authMiddleware"
import { verifyCode } from "../controllers/codeController"
import { createProduct, deleteProduct, getAllProducts, getOneProduct, updateProduct } from "../controllers/productController"


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

route.post("/api/code", verifyCode)

route.get("/api/user", authMiddleware, getUser)

route.post("/api/login", login)

route.delete("/api/user", authMiddleware, deleteUser)





route.post("/api/produto", authMiddleware, createProduct)

route.get("/api/produtos", authMiddleware, getAllProducts)

route.get("/api/produto/:id", authMiddleware, getOneProduct)

route.delete("/api/produto/:id", authMiddleware, deleteProduct)

route.put("/api/produto/:id", authMiddleware, updateProduct)


//adminMiddleware, 
/*


route.put("/api/produto:id", authMiddleware, adminMiddleware, updateProduct)

route.delete("/api/produto:id", authMiddleware, adminMiddleware, deleteProduct)






route.post("/api/cart:produtoId", authMiddleware, addToCart)

route.delete("/api/cart:produtoId", authMiddleware, removeFromCart)

route.put("/api/cart:produtoId", authMiddleware, updateFromCart)*/

export default route