const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const createSchema = (modelPai, model, options = {}) => {
    return new Schema({
        ...modelPai,
        ...model,
    }, {
        timestamps: true,
        collection: 'UsuarioCollection',
        ...options,
    })    
}

const userSchema = require('./usuario');
const usuario = mongoose.model('usuario', createSchema(undefined, userSchema, {
    discriminatorKey: 'kind',
}));

const adiminSchema = require('./admnistrador')
const admnistrador = usuario.discriminator('admnistrador', createSchema(userSchema, adiminSchema, {}))

module.exports = {
    usuario,
    admnistrador
}