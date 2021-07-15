const fileUtils = require('../utils/file.utils')

const musicosData = (model) => {
    const{  _id, nome, profile, generomusical, imagem, uf, cidade, email,status, post } = model
    // console.log(model);
    return{
        id: _id,
        profile,
        nome,
        generomusical,
        imagem: fileUtils.criaEndDownload('musicos', imagem.nome),
        uf,
        cidade,
        status,
        email,
        post
    }
}

module.exports = {
    musicosData
}