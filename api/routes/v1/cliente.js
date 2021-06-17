const Joi = require('joi');
const validateDTO = require('../../utils/middlewares/validate-dto.middleware');

const clienteController = require('../../controllers/cliente.controller')

module.exports = (router) => {

    router.route('/cliente')
    .get(
      clienteController.lista
    )
    .post(
      validateDTO('body', {
        nome: Joi.string().required().messages({
            'any.required': `"nome" é um campo obrigatório`,
            'string.empty': `"nome" não deve ser vazio.`
          }),
        descricao: Joi.string().required().messages({
            'any.required': `"categoria" é um campo obrigatório`,
            'string.empty': `"categoria" não deve ser vazio.`
          }),
        cnpj: Joi.string().required().messages({
          'any.required': `"cnpj" é um campo obrigatório`,
          'string.empty': `"cnpj" não deve ser vazio`,
        }),
        endereco: Joi.string().required().messages({
          'any.required': `"endereco" é um campo obrigatório`,
          'string.empty': `"endereco" não deve ser vazio`,
        }),
        cidade: Joi.string().required().messages({
          'any.required': `"cidade" é um campo obrigatório`,
          'string.empty': `"cidade" não deve ser vazio`,
        }),
        telefone: Joi.string().required().messages({
          'any.required': `"telefone" é um campo obrigatório`,
          'string.empty': `"telefone" não deve ser vazio`,
        }),
        email: Joi.string().email().required().messages({
          'any.required': `"email" é um campo obrigatório`,
          'string.empty': `"email" não deve ser vazio`,
        }),
        senha: Joi.string().required().messages({
          'any.required': `"senha" é um campo obrigatório`,
          'string.empty': `"senha" não deve ser vazio`,
        }),      
      }),
        clienteController.criar
    )

    router.route('/cliente/:clienteid/ativa')
    .put(
      validateDTO('params', {
        clienteid: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"cliente id" é um campo obrigatório`,
          'string.empty': `"cliente id" não deve estar vazio`,
          'string.pattern.base': `"cliente id" fora do formato esperado`,
        }),
      }),
      clienteController.ativa
    )

    router.route('/cliente/:clienteid/inativa')
    .put(
      validateDTO('params', {
        clienteid: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
          'any.required': `"cliente id" é um campo obrigatório`,
          'string.empty': `"cliente id" não deve estar vazio`,
          'string.pattern.base': `"cliente id" fora do formato esperado`,
        }),
      }),
      clienteController.inativa
    )

  }