const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const anuncioSchema = {
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuario',
    },
    descricao: {
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: true,
    },
}

module.exports = anuncioSchema