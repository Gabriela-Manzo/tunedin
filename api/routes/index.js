const { Router } = require('express')
const { name, version } = require('../../package.json')

const v1Usuarios = require('./v1/usuario')
const v1Categoria = require('./v1/categoria')
const v1Musicos = require('./v1/musicos')

module.exports = (app) => {

    app.get('/', (req, res, next) => {
        res.send({ name, version });
    });

    const routesV1 = Router();
    v1Usuarios(routesV1);
    v1Categoria(routesV1);
    v1Musicos(routesV1);

    app.use('/v1', routesV1);
}