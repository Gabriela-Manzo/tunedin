const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const categoriaSchema = {
    nome: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
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
      tipo: {
        type: String,
        required: false,
      },
    },
    
    usuarios: [{
      type: Schema.Types.ObjectId,
      ref: 'usuario'
    }]
}

module.exports = categoriaSchema