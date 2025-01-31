"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorMessage = {
    passwordSizeError: "Sua senha deve conter pelo menos 8 caracteres",
    confirmPasswordSizeError: "A confirmação deve conter pelo menos 8 caracteres",
    passwordMatchError: "Senhas devem ser iguais",
    emailTypeError: "Email Invalido",
    emailSizeError: "Seu Email deve conter pelo menos 7 caracteres",
    nameSizeError: "Seu nome deve conter pelo menos 2 caracteres",
    codeSizeError: "Código não contém 24 digitos",
    idSizeError: "Id não contém 24 digitos",
    tokenSizeError: "Token não contém 172 caracteres",
    productNameSizeError: "O nome do produto deve conter pelo menos 2 caracteres.",
    productPriceSizeError: "O preço do produto  deve conter 7 caracteres totais no formato R$00,00 .",
    productSizeError: "O tamanho do produto  deve conter pelo menos 1 tamanho com no minimo 1 digito",
    productColorNameSizeError: "O nome da cor do produto deve conter pelo menos 3 caracteres",
    productColorHexMaxSizeError: "O código da cor do produto deve conter no maximo 7 caracteres.",
    productColorHexMinSizeError: "O código da cor do produto deve conter no minimo 4 caracteres.",
    productCategoryError: "A categoria do produto deve ser um array de strings com pelo menos uma categoria."
};
exports.default = ErrorMessage;
