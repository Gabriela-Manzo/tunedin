const usuarioController = require('../../controllers/usuario.controller')
const validateDTO = require('../../utils/middlewares/validate-dto.middleware')
const Joi = require('joi')

module.exports = (router) => {

    router.route('/auth')
      .post(
        validateDTO('body', {
          email: Joi.string().required().messages({
            'any.required': `"e-mail" é um campo obrigatório`,
            'string.empty': `"e-mail" não deve ser vazio`,
          }),
          senha: Joi.string().required().messages({
            'any.required': `"senha" é um campo obrigatório`,
            'string.empty': `"senha" não deve ser vazio`,
          }),
        }),
        usuarioController.auth
      )
  
  }
  