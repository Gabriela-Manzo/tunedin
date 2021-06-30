const fileUtils = require('../utils/file.utils')
const postData = (model) => {
  const {  _id, usuario, categoria, imagem, mensagem } = model

  return {
    id: _id,
    usuarioid: usuario,
    // categoriaNome: categoria.nome,
    categoriaid: categoria,
    imagem: fileUtils.criaEndDownload('musicos', imagem.nome),
    mensagem
  }
}

module.exports = {
  postData
}