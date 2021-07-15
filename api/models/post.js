const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = {
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuario',
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'categoria',
    },
    imagem: {
        nomeOriginal: {
          type: String,
          required: false,
        },
        nome: {
          type: String,
          required: false,
        },
        type: {
          type: String,
          required: false,
        },
      },
    mensagem: {
        type: String,
        required: true,
    },
}