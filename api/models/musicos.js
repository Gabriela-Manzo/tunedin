const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const musicosSchema = {

    nome: {
        type: String,
        required: true,
    },
    profile: {
      type: String,
      required: true,
    },
    generomusical: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        requied: true,
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
        tipo: {
          type: String,
          required: false,
        },
      },
    cidade: {
        type: String,
        required: true,
    }

}

module.exports = musicosSchema