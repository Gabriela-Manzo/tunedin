const fileUtils = require('../utils/file.utils')

const musicosData = (model) => {
    const{  _id, nome, categoria, generomusical, imagem, status } = model
    
    return{
        id: _id,
        nome,
        categoria,
        generomusical,
        imagem: fileUtils.criaEndDownload('musicos', imagem.nome),
        status,
    }
}

module.exports = {
    musicosData
}