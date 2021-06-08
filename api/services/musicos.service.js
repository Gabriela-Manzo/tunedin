const { musicos } = require('../models/index');
const musicosMapper = require('../mappers/musicos.mapper');
const fileUtils = require('../utils/file.utils');
const { validaEmail } = require('../services/usuario.service')
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
        ...resto,
        senha: criarHash(senha),
        status: 'Analise',
        imagem: {
            nomeOriginal: model.imagem.originalname,
            nome: model.imagem.novoNome,
            tipo: model.imagem.type,
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
  
    if (status === 'Ativo') {
  
      //TODO: adicionar o envio de email
      emailUtils.enviar({
        destinatario: musicosDB.email,
        remetente: process.env.SENDGRID_REMETENTE,
        assunto: `Confirmação do cadastro de ${musicos.nome}`,
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

  // const listaMusicoByCategoria = async (model) => {

  //   console.log(musicos.categoria);

  //     const musicosDB = await musicos.findOne(model.categoria).populate('musicos');

      

  //     // console.log(JSON.stringfy(musicosDB.categoria));

  //     // const musicosAsJSON = musicosDB.toJSON()

  //     return musicosDB.categoria.map(item => {
  //       return musicosMapper.musicosData(item);
  //     })

  // }

module.exports = {
    criarPerfil,
    listarTodos,
    alteraStatus,
    // listaMusicoByCategoria
}