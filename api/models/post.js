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
    descricao: {
        type: String,
        required: true,
    },
    status:{
        type: String,
        required: true,
    },
}