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
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "e2f0dd31808b6b",
            pass: "fd09a725bbe6e1"
        }
    });
    const message = {
        from: "Burnout <burnout@hotmail.com>",
        to: email,
        subject: "Código de Verificação",
        html: `
<html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
      <title>Email de Verificação</title>
      <style>
        *, *::before, *::after {
        box-sizing: border-box;
        }
        * {
        margin: 0;
        }
        .inner{
            box-shadow: inset 2px 2px 5px 0  rgba(0, 0, 0,0.2) ;
        }
        .drop{
            box-shadow: 2px 2px 5px 0  rgba(0, 0, 0, 0.2);
        }

        body {
        line-height: 1.5;
        -webkit-font-smoothing: antialiased;
        font-family: "Poppins";
        font-weight: 300;
        }
        .container-geral{
            display: flex;
            width: 100vw; 
            justify-content: center;
            padding-top: 100px; 
        }
        .container{
            display: flex ;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            padding: 18px;
            gap: 30px;

            background-color: #FFF4F4;
            color: #B91C1C ;
            border: 2px solid #D10C0C;
            border-radius: 7.5px;
        }
        .titulo{
            font-size: 36px ;
            max-width: 10ch;
            
        }
        .conteudo{
            font-size: 24px ;
            display: flex;
            align-items: end;
            margin-top: 20px;
            
        }
        span {
            text-decoration: underline  #B91C1C 2px;

        }
        .botao {
            border-radius: 7.5px;
            color: #fff;
            font-size: 24px;
            background-color: #B91C1C;
            border: 1px solid #D10C0C;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-top: 12px;
            padding-bottom: 12px;
            width: 100%;
            height: 48px;
        }
        p{
            max-width: 10ch ;
        }
        a{
            text-decoration: none;
        }
        @media (max-width:520px){
           .botao{
            font-size: 16px;
            height: 38px;
           }
           .conteudo{
            font-size:16px; 
            margin-top:10px;
            gap: 5px; 
            flex-wrap: wrap;
           }
           .container{
            gap: 20px;
           }
           .titulo{
            font-size:24px
           }
        }
      </style>
    </head>
    <body>
        <main class="container-geral ">
                <div class="container drop inner">
                    <div>
                        <h1 class="titulo">Bem vindo a Burnout</h1>
                        <div class="conteudo">
                            <p>Código de Verificação: </p>
                            <span>${code}</span>
                        </div>

                    </div>
                    <a href="" class="botao drop inner">Validar Código</a>
                </div>
        </main>
    </body>
    </html>`,
        text: `${code}`
    };
    yield transport.sendMail(message);
    return `Codigo Enviado Para o Email ${email}`;
});
exports.sendVerificationCode = sendVerificationCode;
