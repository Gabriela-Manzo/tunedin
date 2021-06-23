const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = {
    email: {
        type: String,
        required: true,
    },
    senha: {
        type: String,
        required: true,
    },
}