import express from "express"
import dotenv from "dotenv"
import helmet from "helmet"
import cors from "cors"
import route from "./routes/routes"


dotenv.config()

const porta = process.env.PORTA || 3001
const server = express()

server.use(helmet())

server.use(cors({
	origin: "*"
}))

server.use(express.urlencoded({
	extended: true
}))

server.use(express.json())

server.use("/api/ping", (req, res) => {
	res.status(200).json({
		pong: true
	})
})

server.use(route)


server.use("", (req, res) => {
	res.status(404).json({
		message: "Route not found, if you have permission try /api/routes"
	})
})

server.listen(porta, () => {
	console.log(`Servidor Rodando na Porta http://localhost:${porta}/`)
})