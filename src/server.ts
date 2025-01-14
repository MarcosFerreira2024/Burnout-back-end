import express from "express"
import dotenv from "dotenv"
import helmet from "helmet"
import cors from "cors"

dotenv.config()

const porta = process.env.PORTA || 3000
const server = express()

server.use(express.urlencoded({
	extended: true
}))

server.use(express.json())

server.use("/api/ping", (req, res) => {
	res.status(200).json({
		pong: true
	})
})

server.listen(porta, () => {
	console.log(`Servidor Rodando na Porta http://localhost:${porta}/`)
})