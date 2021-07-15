const { musicos } = require('../models/index');
const { musicosData } = require('../mappers/musicos.mapper');
const postMapper = require('../mappers/post.mapper');
const fileUtils = require('../utils/file.utils');
const emailUtils = require('../utils/email.utils');
const { validaEmail, buscaTipoUsuario } = require('../services/usuario.service')
const { criarHash } = require('../utils/criptografia')

const listarTodos = async (filtro) => {
    const listaDB = await musicos.find({}).populate({
      path: 'curtidas', model: 'curtida',
    populate: {
      path: 'cliente', model: 'cliente'
    }
    })

    return listaDB.map(item => {
        return musicosData(item.toJSON())
    })
}

const criarPerfil = async (model) => {

    const { email, senha, ...resto } = model;

    if (await validaEmail(email))
    return {
        sucesso: false,
        mensagem: 'operação não pode ser realizada',
        detalhes: [
          'Já existe usuário cadastrado para o email informado'
        ],
      }
  
    const novoPerfil = await musicos.create({
        email,
        senha: criarHash(senha),
        ...resto,
        status: 'Analise',
        imagem: {
            nomeOriginal: model.imagem.nomeOriginal,
            nome: model.imagem.novoNome,
            type: model.imagem.type,
          }      
    })
    
    fileUtils.mover(model.imagem.caminhoOriginal, model.imagem.novoCaminho);

    return{
        sucesso: true,
        mensagem: 'cadastro realizado com sucesso',
        data: musicosData(novoPerfil)
    }
}
const alteraStatus = async (id, status) => {

    const musicosDB = await musicos.findById(id);
  
    if (!musicosDB) {
  
      return {
        sucesso: false,
        mensagem: 'operação não pode ser realizada',
        detalhes: [
          'Não existe musico cadastrado para o musico id informado'
        ],
      };
  
    }
  
    musicosDB.status = status;
  
    await musicosDB.save();
  
    if (status === 'Ativo') {
      
      emailUtils.enviar({
        destinatario: musicosDB.email,
        remetente: process.env.SENDGRID_REMETENTE,
        assunto: `Confirmação do cadastro de ${musicosDB.nome}`,
        corpo: `sua conta do projeto 04 já esta liberada para uso para uso já`,
      });
  
    }
  
    return {
      sucesso: true,
      mensagem: 'Operação realizada com sucesso',
      data: {
        ...musicosData(musicosDB.toJSON())
      }
    }
  
  }

  // const listaPostsByMusico = async (musicosid) => {

  //   const musicosFromDB = await musicos.findById(musicosid).populate('post');
    
  //   const musciosAsJSON = musicosFromDB.toJSON();
  //   return [musciosAsJSON].map(item => {
  //     return musicosData(item);
  //   });
  
  // }
  
  const buscaPorId = async (musicosid, { id, tipo }) => {

    const musicosDB = await musicos.findById(musicosid);
  
    if (!musicosDB) {
      return {
        sucesso: false,
        mensagem: "operação não pode ser realizada",
        detalhes: [
          "o fornecedor pesquisado não existe"
        ]
      }
    }
  
    const tipoUsuario = buscaTipoUsuario(tipo);
  
    if (tipoUsuario.descricao === "musicos") {
      if (musicosid !== id) {
        return {
          sucesso: false,
          mensagem: "operação não pode ser realizada",
          detalhes: [
            "o usuário não pode realizar esta operação"
          ]
        }
      }
    }
  
    return {
      sucesso: true,
      data: musicosData(musicosDB.toJSON()),
    }
  
  
  }
    
  
  

module.exports = {
    criarPerfil,
    listarTodos,
    alteraStatus,
    // listaPostsByMusico,
    buscaPorId,
}