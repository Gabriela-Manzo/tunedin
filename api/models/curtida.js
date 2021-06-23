const mongoose = require('mongoose');
const Schema = mongoose.Schema;


module.exports = {
  musicos: { 
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'post',
  },
  cliente: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'cliente',
  },
}