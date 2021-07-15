const mongoose = require('mongoose');
const Schema = mongoose.Schema;


module.exports = {

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
        type: {
          type: String,
          required: false,
        },
      },
    cidade: {
        type: String,
        required: true,
    },
    post: [{
      type: Schema.Types.ObjectId,
      ref: 'post'
  }],
    curtidas: [{
      type: Schema.Types.ObjectId,
      ref: 'curtida'
    }]

}
