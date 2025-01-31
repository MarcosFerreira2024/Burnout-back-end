"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes/routes"));
dotenv_1.default.config();
const porta = process.env.PORTA || 3001;
const server = (0, express_1.default)();
server.use((0, helmet_1.default)());
server.use((0, cors_1.default)({
    origin: "*"
}));
server.use(express_1.default.urlencoded({
    extended: true
}));
server.use(express_1.default.json());
server.use("/api/ping", (req, res) => {
    res.status(200).json({
        pong: true
    });
});
server.use(routes_1.default);
server.use("", (req, res) => {
    res.status(404).json({
        message: "Route not found, if you have permission try /api/routes"
    });
});
server.listen(porta, () => {
    console.log(`Servidor Rodando na Porta http://localhost:${porta}/`);
});
