const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const musicosSchema = {

    nome: {
        type: String,
        required: true,
    },
    categoria: {
        type: Schema.Types.String,
        ref: 'categoria'
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
        originalname: {
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
      }  

}

module.exports = musicosSchema