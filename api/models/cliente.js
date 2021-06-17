const clienteSchema = {
    nome: {
        type: String,
        required: true,
    },
    descricao: {
        type: String,
        required: true,
    },
    cnpj: {
        type: String,
        required: true,
    },
    endereco: {
        type: String,
        required: true,
    },
    cidade: {
        type: String,
        required: true,
    },
    telefone: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
};

module.exports = clienteSchema