const { musicos } = require('../models/index');
const { musicosData } = require('../mappers/musicos.mapper');
const postMapper = require('../mappers/post.mapper');
const fileUtils = require('../utils/file.utils');
const { validaEmail, buscaTipoUsuarioPorId } = require('../services/usuario.service')
const { criarHash } = require('../utils/criptografia')

const listarTodos = async () => {
    const listaDB = await musicos.find({})

    return listaDB.map(musicosDB => {
        return musicosMapper.musicosData(musicosDB)
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
            tipo: model.imagem.tipo,
          }      
    })
    
    fileUtils.mover(model.imagem.caminhoOriginal, model.imagem.novoCaminho);

    return{
        sucesso: true,
        mensagem: 'cadastro realizado com sucesso',
        data: musicosMapper.musicosData(novoPerfil)
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
  
    // if (status === 'Ativo') {
  
    //   emailUtils.enviar({
    //     destinatario: musicosDB.email,
    //     remetente: process.env.SENDGRID_REMETENTE,
    //     assunto: `Confirmação do cadastro de ${musicos.nome}`,
    //     corpo: `sua conta do projeto 04 já esta liberada para uso para uso já`,
    //   });
  
    // }
  
    return {
      sucesso: true,
      mensagem: 'Operação realizada com sucesso',
      data: {
        ...musicosData(musicosDB.toJSON())
      }
    }
  
  }

  const listaPostsByMusico = async (musicoid, musicologadoid) => {

    const musicosFromDB = await musicos.findById(musicoid).populate('post');
  
    const musciosAsJSON = musicosFromDB.toJSON();
    return musciosAsJSON.post.map(item => {
      return postMapper.postData(item);
    });
  
  }
  
  const buscaPorId = async (musicoid) => {
  
    //, { id, tipo }
    const musicosDB = await musicos.findById(musicoid);
  
    if (!musicosDB) {
      return {
        sucesso: false,
        mensagem: "operação não pode ser realizada",
        detalhes: [
          "o musico pesquisado não existe"
        ]
      }
    }
  
    // const tipoUsuario = buscaTipoUsuarioPorId(tipo);
  
    // if (tipoUsuario.descricao === "musico") {
    //   if (musicoid !== id) {
    //     return {
    //       sucesso: false,
    //       mensagem: "operação não pode ser realizada",
    //       detalhes: [
    //         "o usuário não pode realizar esta operação"
    //       ]
    //     }
    //   }
    // }
  
    return {
      sucesso: true,
      data: musicosMapper.musicosData(musicosDB.toJSON()),
    }
  
  
  }

module.exports = {
    criarPerfil,
    listarTodos,
    alteraStatus,
    listaPostsByMusico,
    buscaPorId
   
}