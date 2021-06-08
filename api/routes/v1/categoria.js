const categoriaController = require('../../controllers/categoria.controller')
const validateDTO = require('../../utils/middlewares/validate-dto.middleware')
const fileUpload = require('../../utils/middlewares/file-upload.middleware')
const Joi = require('joi')


module.exports = (router) => {

    router.route('/categoria')
    .get(
        categoriaController.listar
    )
    .post(
        fileUpload('categoria'),
        validateDTO('body', {
            nome: Joi.string().required().messages({
                'any.required': `"nome" é um campo obrigatório`,
                'string.empty': `"nome" não deve ser vazio`,
              }),
            status: Joi.boolean().required().messages({
                'any.required': `"status" é um campo obrigatório`,
                'booleam.empty': `"status" não deve ser vazio`,
              }),
            }, {
              allowUnknown: true,       
        }),
        categoriaController.criar
    )

    router.route('/categoria/:categoriaid')
    .get(
        categoriaController.buscaPorId
    )
    .put(
        fileUpload('categoria', true),
        validateDTO('params', {
          categoriaid: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"categoria id" é um campo obrigatório`,
          'string.empty': `"categoria id" não deve ser vazio`,
          'string.regex': `"categoria id" fora do formato experado`,
          }),
        }),
        validateDTO('body', {
            nome: Joi.string().required().messages({
                'any.required': `"nome" é um campo obrigatório`,
                'string.empty': `"nome" não deve ser vazio`,
              }),
            status: Joi.boolean().required().messages({
                'any.required': `"status" é um campo obrigatório`,
                'booleam.empty': `"status" não deve ser vazio`,
              }),
            }, {
              allowUnknown: true,
            }),
        categoriaController.alterar
    )
    .delete(
        validateDTO('params', {
          categoriaid: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
            'any.required': `"nome" é um campo obrigatório`,
            'string.empty': `"nome" não deve ser vazio`,
          }),
        }),
        categoriaController.deletar
    )
}