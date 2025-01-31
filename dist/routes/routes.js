"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const Middleware_1 = require("../middlewares/Middleware");
const codeController_1 = require("../controllers/codeController");
const productController_1 = require("../controllers/productController");
const cartController_1 = require("../controllers/cartController");
const route = (0, express_1.Router)();
route.get("/api/routes", (req, res) => {
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
    });
});
route.post("/api/sign", userController_1.CreateUser);
route.get("/api/users", Middleware_1.authMiddleware, Middleware_1.adminMiddleware, userController_1.getAllUsers);
route.get("/api/user", Middleware_1.authMiddleware, userController_1.getUser);
route.post("/api/login", userController_1.login);
route.delete("/api/user", Middleware_1.authMiddleware, userController_1.deleteUser);
route.delete("/api/user/:id", Middleware_1.authMiddleware, Middleware_1.adminMiddleware, userController_1.deleteUser);
route.put("/api/user", Middleware_1.authMiddleware, userController_1.updateUser);
route.post("/api/code", codeController_1.verifyCode);
route.post("/api/produto", Middleware_1.authMiddleware, Middleware_1.adminMiddleware, productController_1.createProduct);
route.get("/api/produtos", productController_1.getAllProducts);
route.get("/api/produto/:id", productController_1.getOneProduct);
route.delete("/api/produto/:id", Middleware_1.authMiddleware, Middleware_1.adminMiddleware, productController_1.deleteProduct);
route.put("/api/produto/:id", Middleware_1.authMiddleware, Middleware_1.adminMiddleware, productController_1.updateProduct);
route.post("/api/user/:userId/cart/:produtoId", Middleware_1.authMiddleware, cartController_1.addOrIncrementProductInCart);
route.delete("/api/user/:userId/cart/:produtoId", Middleware_1.authMiddleware, cartController_1.removeAllFromOneProduct);
route.get("/api/user/:userId/cart", Middleware_1.authMiddleware, cartController_1.getCartItems);
route.put("/api/user/:userId/cart", Middleware_1.authMiddleware, cartController_1.receiveCartState);
exports.default = route;
