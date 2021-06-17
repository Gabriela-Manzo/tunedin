const Joi = require('joi');
const validateDTO = require('../../utils/middlewares/validate-dto.middleware');
const fileUpload = require('../../utils/middlewares/file-upload.middleware');
const musicosController = require('../../controllers/musicos.controller')

module.exports = (router) => {

    router.route('/musicos')
    .get(
        musicosController.listar,
    )
    .post(
        fileUpload('musicos'),
        validateDTO('body', {
            nome: Joi.string().required().messages({
                'any.required': `"nome" é um campo obrigatório`,
                'string.empty': `"nome" não deve ser vazio.`
            }),
            generomusical: Joi.string().required().messages({
                'any.required': `"genero musical" é um campo obrigatório`,
                'string.empty': `"genero musical" não deve ser vazio.`
            }),
            cidade: Joi.string().required().messages({
                'any.required': `"cidade" é um campo obrigatório`,
                'string.empty': `"cidade" não deve ser vazio`,
            }),
            email: Joi.string().email().required().messages({
                'any.required': `"email" é um campo obrigatório`,
                'string.empty': `"email" não deve ser vazio`,
              }),
            senha: Joi.string().required().messages({
                'any.required': `"senha" é um campo obrigatório`,
                'string.empty': `"senha" não deve ser vazio`,
            }),
        }, {
          allowUnknown: true,       
    }),
        musicosController.criar
    )

    // router
    // .route('/musicos/categoria')
    // .get(
    //     validateDTO('body', {
    //         categoria: Joi.string().required().messages({
    //             'any.required': `"categoria" é um campo obrigatório`,
    //             'string.empty': `"categoria" não deve ser vazio.`
    //         }),
    //     }),
    //     musicosController.buscarMusicosByCategoria
    // )

}