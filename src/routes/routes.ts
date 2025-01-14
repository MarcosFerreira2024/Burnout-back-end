import { Router } from "express"
import { CreateUser } from "../controllers/userController"


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

route.post("/api/register", CreateUser)

//route.post("/api/login", verifyUser)

export default route