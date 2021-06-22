const postController = require('../../controllers/post.controller')
// const validateDTO = require('../../utils/middlewares/validate-dto.middleware')
// const Joi = require('joi')

module.exports = (router) => {

  router
  .route('/posts')
  .get(
    postController.listar
  )
}