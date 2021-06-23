const fileUtils = require('../utils/file.utils')
const postData = (model) => {
  const {  _id, usuario, categoria, imagem, mensagem, contatos, portfolio } = model

  return {
    id: _id,
    usuarioId: usuario,
    // categoriaNome: categoria.nome,
    categoriaId: categoria,
    imagem: fileUtils.criaEndDownload('musicos', imagem.nome),
    mensagem,
    contatos,
    portfolio
  }
}

module.exports = {
  postData
}