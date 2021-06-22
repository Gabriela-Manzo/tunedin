const Joi = require('joi');
const validateDTO = require('../../utils/middlewares/validate-dto.middleware');
const fileUpload = require('../../utils/middlewares/file-upload.middleware');
const musicosController = require('../../controllers/musicos.controller')
const postController = require('../../controllers/post.controller')

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
            profile: Joi.string().required().messages({
              'any.required': `"profile" é um campo obrigatório`,
              'string.empty': `"profile" não deve ser vazio.`
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

    router
    .route('/musicos/:musicosid')
    .get(
      validateDTO('params', {
        musicosid: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"musico id" é um campo obrigatório`,
          'string.empty': `"musico id" não deve ser vazio`,
          'string.pattern.base': `"musico id" fora do formato experado`,
        }),
      }),
      musicosController.buscaPorId,
    )
    router
    .route('/musicos/:musicosid/ativa')
    .put(
      validateDTO('params', {
        musicosid: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"musico id" é um campo obrigatório`,
          'string.empty': `"musico id" não deve ser vazio`,
          'string.pattern.base': `"musico id" fora do formato experado`,
        }),
      }),
      musicosController.ativa,
    )

  router
    .route('/musicos/:musicosid/inativa')
    .put(
      validateDTO('params', {
        musicosid: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"musico id" é um campo obrigatório`,
          'string.empty': `"musico id" não deve ser vazio`,
          'string.pattern.base': `"musico id" fora do formato experado`,
        }),
      }),
      musicosController.inativa,
    )
    router.route('/musicos/:usuarioid/post')
    .post(
        validateDTO('params', {
            usuarioid: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
                'any.required': `"usuario id" é um campo obrigatório`,
                'string.empty': `"usuario id" não deve ser vazio`,
                'string.pattern.base': `"usuario id" fora do formato experado`,
            }),
          }),
        validateDTO('body', {
          descricao: Joi.string().required().messages({
            'any.required': `"descrição" é um campo obrigatório`,
            'string.empty': `"descrição" não deve ser vazio`,
          }),
          categoriaid: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
            'any.required': `"categoria id" é um campo obrigatório`,
            'string.empty': `"categoria id" não deve ser vazio`,
            'string.pattern.base': `"categoria id" fora do formato experado`,
          }),
          status: Joi.boolean().required().messages({
            'any.required': `"status" é um campo obrigatório`,
            'booleam.empty': `"status" não deve ser vazio`
          }),
        }, {
          allowUnknown: true,
        }),
        postController.cria
      )
      router
      .route('/musicos/:usuarioid/post/:postid')
      .delete(
        validateDTO('params', {
          usuarioid: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
            'any.required': `"usuario id" é um campo obrigatório`,
            'string.empty': `"usuario id" não deve ser vazio`,
            'string.pattern.base': `"usuario id" fora do formato experado`,
          }),
          postid: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
            'any.required': `"post id" é um campo obrigatório`,
            'string.empty': `"post id" não deve ser vazio`,
            'string.pattern.base': `"post id" fora do formato experado`,
          }),
        }),
        postController.deleta
      )
}

