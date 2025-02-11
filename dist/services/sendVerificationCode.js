"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationCode = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendVerificationCode = (email, code) => __awaiter(void 0, void 0, void 0, function* () {
    const transport = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_SERVER_PASSWORD
        }
    });
    const message = {
        from: "suporteBurnout.2025@gmail.com",
        to: email,
        subject: "Código de Verificação",
        html: `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email de Verificação</title>
    <style>
        /* Estilos inline para compatibilidade */
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
        }
        .header {
            background-color: #B91C1C;
            color: #ffffff;
            text-align: center;
            padding: 20px;
        }
        .content {
            padding: 20px;
            color: #333;
        }
        .code {
            font-size: 24px;
            font-weight: bold;
            color: #B91C1C;
            text-align: center;
            margin: 20px 0;
        }
        .button {
            display: block;
            width: 100%;
            max-width: 200px;
            margin: 0 auto;
            padding: 10px;
            background-color: #B91C1C;
            color: #ffffff;
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
            font-size: 18px;
        }
        .footer {
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>
<body>
    <!-- Estrutura baseada em tabelas para compatibilidade -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f4f4f4">
        <tr>
            <td align="center" valign="top">
                <table class="container" width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff">
                    <tr>
                        <td class="header" align="center" valign="top">
                            <h1>Bem-vindo à Burnout</h1>
                        </td>
                    </tr>
                    <tr>
                        <td class="content" align="center" valign="top">
                            <p>Seu código de verificação é:</p>
                            <div class="code">${code}</div>
                            <p>Use este código para validar sua conta.</p>
                        </td>
                    </tr>

                    <tr>
                        <td class="footer" align="center" valign="top">
                            <p>Se você não solicitou este código, ignore este e-mail.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`,
        text: `${code}`
    };
    yield transport.sendMail(message);
    return `Codigo Enviado Para o Email ${email}`;
});
exports.sendVerificationCode = sendVerificationCode;
