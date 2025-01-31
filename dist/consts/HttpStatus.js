"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HTTP_STATUS = {
    OK: 200, // Requisição bem-sucedida
    CREATED: 201, // Recurso criado com sucesso
    BAD_REQUEST: 400, // Requisição inválida
    UNAUTHORIZED: 401, // Usuário não autenticado
    FORBIDDEN: 403, // Acesso negado
    NOT_FOUND: 404, // Recurso não encontrado
    METHOD_NOT_ALLOWED: 405, // Método não permitido
    INTERNAL_SERVER_ERROR: 500, // Erro interno do servidor
    BAD_GATEWAY: 502, // Gateway inválido
};
exports.default = HTTP_STATUS;
