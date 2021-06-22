const { post, usuario, categoria } = require('../models/index')
const postMapper = require('../mappers/post.mapper')

const criar = async (model) => {
  const [usuarioDB, categoriaDB] = await Promise.all([
    usuario.findById(model.usuarioid),
    categoria.findById(model.categoriaid),
  ])

  if(!usuarioDB) {
    return {
      sucesso: false,
      mensagem: 'operação não pode ser realizada',
      detalhes: ['usuário informado não existe.'],
    }
  }
  if (!categoriaDB) {
    return {
      sucesso: false,
      mensagem: 'operação não pode ser realizada',
      detalhes: [
        'Não existe categoria cadastrada para o categoria id informado'
      ],
    };
  }

  const novoPost = await post.create({
    usuario: model.usuarioid,
    categoria: model.categoriaid,
    descricao: model.descricao,
    status: model.status,
  })

  usuarioDB.post = [...usuarioDB.post, novoPost._id]

  categoriaDB.post = [...categoriaDB.post, novoPost._id];


  await Promise.all([
    categoriaDB.save(),
    usuarioDB.save()])

  return {
    sucesso: true,
    mensagem: 'post realizado com sucesso',
    data: {
      id: novoPost._id,
      categoria: categoriaDB.nome,
      nome: usuarioDB.nome
    }
  }
}

const listaPost = async () => {
  const listaPostDB = await post.find({})
  return listaPostDB.map(postDB => {
    return postMapper.postData(postDB)
  })
}

const pesquisaPorFiltros = async (filtros) => {

  const filtroMongo = {};

  if (filtros.categoriaid)
    filtroMongo.categoria = filtros.categoriaid;

  if (filtros.fornecedorid)
    filtroMongo.fornecedor = filtros.fornecedorid;
  
  const resultadoDB = await produto.find(filtroMongo).populate("categoria");

  return resultadoDB.map(item => {
    return postMapper.postData(item);
  });
}

const deletar = async ({ usuarioId, postId }) => {
  const [ usuarioDB, postDB ] = await Promise.all([
    usuario.findById(usuarioId),
    post.findById(postId)
  ])
  if (!usuarioDB){
    return {
      sucesso: false,
      mensagem: 'operação não pode ser realizada',
      detalhes: [
        'O usuario informado não existe'
      ]
    }
  }
  if (!postDB){
    return {
      sucesso: false,
      mensagem: 'operação não pode ser realizada',
      detalhes: [
        'O post informado não existe'
      ]
    }
  }
  if (postDB.usuario.toString() !== usuarioId) {
    return {
      sucesso: false,
      mensagem: 'operação não pode ser realizada',
      detalhes: [
        'O usuario informado e inválido.'
      ],
    }
  }

  const categoriaDB = await categoria.findById(postDB.categoria);
  categoriaDB.post = categoriaDB.post.filter(item => {
    return item.toString() !== postId
  });

  usuarioDB.post = usuariorDB.post.filter(item => {
    return item.toString() !== postId
  });

  await Promise.all([
    usuarioDB.save(),
    categoriaDB.save(),
    post.deleteOne(postDB)
  ])

  return{
    sucesso: true,
    mensagem: 'operação realizada com sucesso',
    data: {
      id: postId,
      categoria: categoriaDB.nome,
      nome: usuarioDB.nome
    }
  }
}

module.exports = {
  criar,
  listaPost,
  pesquisaPorFiltros,
  deletar

}