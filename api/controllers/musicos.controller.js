const musicosService = require('../services/musicos.service')

const listar = async (req, res, next) => {
    const result = await musicosService.listarTodos();
    
    return res.status(200).send({data: result})
};

const criar = async (req, res, next) => {
    const { body } = req;
    
    const resultService = await musicosService.criarPerfil(body)

    const codigoRetorno = resultService.sucesso ? 200 : 401;
    const dadoRetorno = resultService.sucesso ? { data: resultService.data } : { detalhes: resultService.detalhes };

    return res.status(codigoRetorno).send(dadoRetorno);
}
const ativa = async (req, res, next) => {

    const { musicosid } = req.params;
    const resultadoServico = await musicosService.alteraStatus(musicosid, 'Ativo');
  
    //TODO: tratar saida e finalizar enpoint
    const codigoRetorno = resultadoServico.sucesso ? 200 : 400;
    const dadoRetorno = resultadoServico.sucesso ? { data: resultadoServico.data } : { detalhes: resultadoServico.detalhes };
  
    return res.status(codigoRetorno).send({
      ...dadoRetorno
    });
  
  }
  
  const inativa = async (req, res, next) => {
  
    const { musicosid } = req.params;
    const resultadoServico = await musicosService.alteraStatus(musicosid, 'Inativo');
  
  
    //TODO: tratar saida e finalizar enpoint
    const codigoRetorno = resultadoServico.sucesso ? 200 : 400;
    const dadoRetorno = resultadoServico.sucesso ? { data: resultadoServico.data } : { detalhes: resultadoServico.detalhes };
  
    return res.status(codigoRetorno).send({
      mensagem: 'operaçao realizada com sucesso',
      ...dadoRetorno
    });
  }
  const buscaPorId = async (req, res, next) => {

    const { musicosid } = req.params;
    // const { id, tipoUsuario } = req.usuario;
  
    const result = await musicosService.buscaPorId(musicosid);
    
    //{ id, tipo: tipoUsuario }
  
    const codigoRetorno = result.sucesso ? 200 : 400;
    const dadoRetorno = result.sucesso ? { data: result.data } : { detalhes: result.detalhes };
  
    return res.status(codigoRetorno).send(dadoRetorno);
  
  }

module.exports = {
    listar,
    criar,
    ativa,
    inativa,
    buscaPorId
    
}