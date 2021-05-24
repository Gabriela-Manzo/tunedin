const { categoria } = require('../models/index')
const categoriaMapper = require('../mappers/categoria.mapper')
const fileUtils = require('../utils/file.utils')

const buscaPorId = async (categoriaId) => {
    const categoriaDB = await categoria.findById(categoriaId)

    if (categoriaDB)
        return categoriaMapper.categoriaData(categoriaDB);
    
    return;
}

const listarTodas = async () => {
    const listaDB = await categoria.find({})

    return listaDB.map(categoriaDB => {
        return categoriaMapper.categoriaData(categoriaDB)
    })
}

const criarCategoria = async (model) => {
    const novaCategoria = await categoria.create({
        nome: model.nome,
        descricao: model.descricao,
        status: model.status,
        imagem: {
            nomeOriginal: model.imagem.originalname,
            nome: model.imagem.novoNome,
            tipo: model.imagem.type,
          }      
    })
    
    fileUtils.mover(model.imagem.caminhoOriginal, model.imagem.novoCaminho);

    return{
        sucesso: true,
        mensagem: 'cadstro realizado com sucesso',
        data: categoriaMapper.categoriaData(novaCategoria)
    }
}

const deletar = async (categoriaId) => {
    const categoriaDB = await categoria.findOne({ _id: categoriaId });

    const categoriaDBJson = categoriaDB.toJSON();
    console.log(categoriaDBJson)

    if (!categoriaDB) {
        return {
            sucesso: false,
            mensagem: 'náo foi possível realizar a operação',
            detalhes: [
                '"categoriaid" não existe.'
            ]
        };
    }

    const { imagem } = categoriaDB;
    fileUtils.remover('categorias', imagem.nome);

    await categoria.remove(categoriaDB);

    return {
        sucesso: true,
        mensagem: 'operação realizada com sucesso.'
    }
}

const alterarCategoria = async (categoriaId, model) => {
    const categoriaDB = await categoria.findOne({ _id: categoriaId })

    if (!categoriaDB) {
        return{
            sucesso: false,
            mensagem: 'não foi possível realizar a operação',
            detalhes: [
                '"categoria" não existe.'
            ]
        };
    }

    fileUtils.remover('categoria', categoriaDB.imagem.nome);

    categoriaDB.nome = model.nome;
    categoriaDB.descricao = model.descricao;
    categoriaDB.status = model.status;
    categoriaDB.imagem = {
        nomeOriginal: model.imagem.originalname,
        nome: model.imagem.novoNome,
        tipo: model.imagem.tipo,
    }

  await categoriaDB.save();

  fileUtils.mover(model.imagem.caminhoOriginal, model.imagem.novoCaminho)

  return {
      sucesso: true,
      mensagem: 'operação realizada com sucesso',
      data: categoriaMapper.categoriaData(categoriaDB),
  }

}
    

module.exports = {
    listarTodas,
    criarCategoria,
    buscaPorId,
    deletar,
    alterarCategoria

}