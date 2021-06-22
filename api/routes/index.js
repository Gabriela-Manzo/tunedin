const { Router } = require('express')
const { name, version } = require('../../package.json')

const v1Usuarios = require('./v1/usuario')
const v1Categoria = require('./v1/categoria')
const v1Musicos = require('./v1/musicos')
const v1Cliente = require('./v1/cliente')
const v1Post = require('./v1/post')

module.exports = (app) => {

    app.get('/', (req, res, next) => {
        res.send({ name, version });
    });

    const routesV1 = Router();
    v1Usuarios(routesV1);
    v1Categoria(routesV1);
    v1Musicos(routesV1);
    v1Cliente(routesV1);
    v1Post(routesV1);

    app.use('/v1', routesV1);
}