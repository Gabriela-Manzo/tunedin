const categoriaService = require('../services/categoria.service')

const listar = async (req, res, next) => {
    const result = await categoriaService.listarTodas();
    
    return res.status(200).send({data: result})
}

const criar = async (req, res, next) => {
    const { body } = req;
    
    const resultService = await categoriaService.criarCategoria(body)

    const codigoRetorno = resultService.sucesso ? 200 : 400;
    const dadoRetorno = resultService.sucesso ? { data: resultService.data } : { detalhes: resultService.detalhes };

    return res.status(codigoRetorno).send(dadoRetorno);
}

const alterar = async (req, res, next) => {
    const { params, body } = req;

    const resultadoServico = await categoriaService.alterarCategoria(params.categoriaid, body);

    const codigoRetorno = resultadoServico.sucesso ? 200 : 400;
    const dadoRetorno = resultadoServico.sucesso ? { data: resultadoServico.data } : { detalhes: resultadoServico.detalhes };

    return res.status(codigoRetorno).send(dadoRetorno);

}

const buscaPorId = async (req, res, next) => {
    const { params } = req;
    
    const categoria = await categoriaService.buscaPorId(params.categoriaid);
  
    if (!categoria)
      return res.status(404).send({
        detalhes: [
          "categoria informada nao existe"
        ]
      });
  
    return res.status(200).send(categoria);
  
}

const deletar = async (req, res, next) => {
    const { params } = req;
  
    const resultadoServico = await categoriaService.deletar(params.categoriaid);

    const codigoRetorno = resultadoServico.sucesso ? 200 : 400;

    const dadoRetorno = resultadoServico.sucesso ? {
    mensagem: resultadoServico.mensagem
  } : { detalhes: resultadoServico.detalhes };

    return res.status(codigoRetorno).send(dadoRetorno);

}
module.exports = {
    listar,
    criar,
    alterar,
    buscaPorId,
    deletar
}