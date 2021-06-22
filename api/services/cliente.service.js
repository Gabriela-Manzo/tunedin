const { cliente } = require('../models/index')
const { clienteData } = require('../mappers/cliente.mapper')
const emailUtils = require('../utils/email.utils');
const { validaEmail } = require('../services/usuario.service')
const { criarHash } = require('../utils/criptografia')

const criarCliente = async (model) => {
    const { email, senha, ...resto } = model;

    if (await validaEmail(email))
    return {
        sucesso: false,
        mensagem: 'operação não pode ser realizada',
        detalhes: [
          'Já existe usuário cadastrado para o email informado'
        ],
      }
  
    const novoCliente = await cliente.create({
        email,
        ...resto,
        senha: criarHash(senha),
        status: 'Analise',      
    })
    
    return{
        sucesso: true,
        mensagem: 'cadastro realizado com sucesso',
        data: clienteData(novoCliente)
    }
}

const alteraStatus = async (id, status) => {

  const clienteDB = await cliente.findById(id);

  if (!clienteDB) {

    return {
      sucesso: false,
      mensagem: 'operação não pode ser realizada',
      detalhes: [
        'Não existe cliente cadastrado para o cliente id informado'
      ],
    };

  }

  clienteDB.status = status;

  await clienteDB.save();

  if (status === 'Ativo') {

    emailUtils.enviar({
      destinatario: clienteDB.email,
      remetente: process.env.SENDGRID_REMETENTE,
      assunto: `Confirmação do cadastro de ${clienteDB.nome}`,
      corpo: `Sua conta do TunedIn já esta liberada para uso!!`,
    });

  }

  return {
    sucesso: true,
    mensagem: 'Operação realizada com sucesso',
    data: {
      ...clienteData(clienteDB.toJSON())
    }
  }

}

const listar = async (filtro) => {
  const resultDB = await cliente.find();

  return resultDB.map(item => {
    return clienteData(item.toJSON());
  })
}


module.exports = {
  criarCliente,
  alteraStatus,
  listar
  
}