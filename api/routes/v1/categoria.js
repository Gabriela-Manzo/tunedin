const categoriaController = require('../../controllers/categoria.controller')
const validateDTO = require('../../utils/middlewares/validate-dto.middleware')
const Joi = require('joi')


module.exports = (router) => {

    router.route('/categoria')
    .get(
        categoriaController.listar
    )
    .post(
        validateDTO('body', {
            nome: Joi.string().required().messages({
                'any.required': `"nome" é um campo obrigatório`,
                'string.empty': `"nome" não deve ser vazio`,
              }),
              descricao: Joi.string().required().messages({
                'any.required': `"descricao" é um campo obrigatório`,
                'string.empty': `"descricao" não deve ser vazio`,
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

    router.route('/categoria/:idcategoria')
    .get(
        categoriaController.buscaPorId
    )
    .put(
        validateDTO('params', {
        idcategoria: Joi.string().required().messages({
            'any.required': `"nome" é um campo obrigatório`,
            'string.empty': `"nome" não deve ser vazio`,
          }),
        }),
        validateDTO('body', {
            nome: Joi.string().required().messages({
                'any.required': `"nome" é um campo obrigatório`,
                'string.empty': `"nome" não deve ser vazio`,
              }),
              descricao: Joi.string().required().messages({
                'any.required': `"descricao" é um campo obrigatório`,
                'string.empty': `"descricao" não deve ser vazio`,
              }),
              status: Joi.boolean().required().messages({
                'any.required': `"status" é um campo obrigatório`,
                'booleam.empty': `"status" não deve ser vazio`,
              }),
            }),
        categoriaController.altera
    )
    .delete(
        validateDTO('params', {
        idcategoria: Joi.string().required().messages({
            'any.required': `"nome" é um campo obrigatório`,
            'string.empty': `"nome" não deve ser vazio`,
          }),
        }),
        categoriaController.deleta
    )
}