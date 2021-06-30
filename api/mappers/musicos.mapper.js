const fileUtils = require('../utils/file.utils')

const musicosData = (model) => {
    const{  _id, nome, profile, generomusical, imagem, uf, cidade, status } = model
    
    return{
        id: _id,
        profile,
        nome,
        generomusical,
        imagem: fileUtils.criaEndDownload('musicos', imagem.nome),
        uf,
        cidade,
        status,
    }
}

module.exports = {
    musicosData
}