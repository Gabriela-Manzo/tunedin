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

const adiminSchema = require('./administrador')
const administrador = usuario.discriminator('administrador', createSchema(userSchema, adiminSchema, {}));

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

//POSTS
const postSchema = require('./post');
const post = mongoose.model('post', createSchema(undefined, postSchema, {
    collection: 'PostCollection',
    toJSON: {
        virtuals: true,
    },
}));

//CURTIDA
const curtidaSchema = require('./curtida')
const curtida = mongoose.model('curtida', createSchema(undefined, curtidaSchema, {
    collection: 'CurtidaCollection',
    toJSON: {
        virtuals: true,
    }
}))

module.exports = {
    usuario,
    administrador,
    categoria,
    musicos,
    cliente,
    post,
    curtida
}