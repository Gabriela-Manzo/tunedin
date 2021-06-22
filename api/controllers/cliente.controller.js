const clienteService = require('../services/cliente.service')

const criar = async (req, res, next) => {
    const { body } = req;
    
    const resultService = await clienteService.criarCliente(body)

    const codigoRetorno = resultService.sucesso ? 200 : 400;
    const dadoRetorno = resultService.sucesso ? { data: resultService.data } : { detalhes: resultService.detalhes };

    return res.status(codigoRetorno).send(dadoRetorno);
}

const ativa = async (req, res, next) => {

    const { clienteid } = req.params;
  
    const resultadoServico = await clienteService.alteraStatus(clienteid, 'Ativo');
  
    const codigoRetorno = resultadoServico.sucesso ? 200 : 400;
    const dadoRetorno = resultadoServico.sucesso ? { data: resultadoServico.data } : { detalhes: resultadoServico.detalhes };
  
    return res.status(codigoRetorno).send({
      ...dadoRetorno
    });
  
}

const inativa = async (req, res, next) => {

    const { clienteid } = req.params;
   
    const resultadoServico = await clienteService.alteraStatus(clienteid, 'Inativo');
  
    const codigoRetorno = resultadoServico.sucesso ? 200 : 400;
    const dadoRetorno = resultadoServico.sucesso ? { data: resultadoServico.data } : { detalhes: resultadoServico.detalhes };
  
    return res.status(codigoRetorno).send({
      mensagem: 'operaçao realizada com sucesso',
      ...dadoRetorno
    });
}

const lista = async (req, res, next) => {
  
    const data = await clienteService.listar();
  
    return res.status(200).send({
      data,
    })
  
  }
  

  

module.exports = {
    criar,
    ativa,
    inativa,
    lista

}