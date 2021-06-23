const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

    curtidas: [{
        type: Schema.Types.ObjectId,
        ref: 'curtida'
      }]
};

module.exports = clienteSchema