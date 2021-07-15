const fileUtils = require('../utils/file.utils')
const postData = (model) => {
  const {  _id, usuario, categoria, imagem, mensagem } = model

  return {
    id: _id,
    usuarioNome: usuario.nome,
    categoriaNome: categoria.nome,
    usuarioId: usuario._id,
    categoriaId: categoria._id,
    imagem: fileUtils.criaEndDownload('posts', imagem.nome),
    mensagem
  }
}

module.exports = {
  postData
}