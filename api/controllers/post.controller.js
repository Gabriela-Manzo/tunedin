const postService = require('../services/post.service')

const cria = async (req, res, next) => {

  const { body, params, usuario } = req

  const resultadoServico = await postService.criar({
    ...params,
    ...body,
    musicoslogadoid: usuario.id
  })

  const codigoRetorno = resultadoServico.sucesso ? 200 : 400
  const dadoRetorno = resultadoServico.sucesso ? { data: resultadoServico.data } : {detalhes: resultadoServico.detalhes}

  return res.status(codigoRetorno).send(dadoRetorno)
}

const listar = async (req, res, next) => {
  const result = await postService.listaPost()
  return res.status(200).send({ data: result })
}

const listarPorMusico = async (req, res, next) => {
  const { usuarioid } = req.params
  const result = await postService.listPostByUser(usuarioid)
  console.log(result)
  return res.status(200).send({
    result,
  })
}

const deleta = async (req, res, next) => {
  const { usuarioid, postid } = req.params
  console.log(req.params);
  console.log(req.usuario);

  const resultadoServico = await postService.deletar({ usuarioId: usuarioid, postId: postid })

  const codigoRetorno = resultadoServico.sucesso ? 200 : 400;
  const dadoRetorno = resultadoServico.sucesso ? { mensagem: resultadoServico.mensagem, data: resultadoServico.data } : { detalhes: resultadoServico.detalhes };

  return res.status(codigoRetorno).send(dadoRetorno);
}


module.exports = {
  cria,
  listar,
  deleta,
  listarPorMusico
}