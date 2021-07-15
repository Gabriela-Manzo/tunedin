const mongoose = require('mongoose');
const Schema = mongoose.Schema;


module.exports = {
    nome: {
      type: String,
      required: true,
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
    status: {
      type: Boolean,
      required: true,
    },
    
    post: [{
      type: Schema.Types.ObjectId,
      ref: 'post'
    }]
}
