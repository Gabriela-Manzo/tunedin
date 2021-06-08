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

//USUARIOS
const userSchema = require('./usuario');
const usuario = mongoose.model('usuario', createSchema(undefined, userSchema, {
    discriminatorKey: 'kind',
}));

const adiminSchema = require('./admnistrador')
const admnistrador = usuario.discriminator('admnistrador', createSchema(userSchema, adiminSchema, {}));

const musicosSchema = require('./musicos');
const musicos = usuario.discriminator('musicos', createSchema(userSchema, musicosSchema, {}));

const clienteSchema = require('./cliente');
const cliente = usuario.discriminator('cliente', createSchema(userSchema, clienteSchema, {}));

//CATEGORIA
const categoriaSchema = require('./categoria');
const categoria = mongoose.model('categoria', createSchema(undefined, categoriaSchema, {
  collection: 'CategoriaCollection',
  toJSON: {
      virtuals: true,
  },
}));

//ANUNCIOS
const anuncioSchema = require('./anuncio');
const anuncio = mongoose.model('anuncio', createSchema(undefined, anuncioSchema, {
    collection: 'AnuncioCollection',
    toJSON: {
        virtuals: true,
    },
}));

module.exports = {
    usuario,
    admnistrador,
    categoria,
    musicos,
    cliente,
    anuncio
}