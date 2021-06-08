const fileUtils = require('../utils/file.utils')

const categoriaData = (model) => {
    const { _id, nome, status, imagem } = model

    return {
        id: _id,
        nome,
        status,
        imagem: fileUtils.criaEndDownload('categoria', imagem.nome),
    }
}

module.exports = {
    categoriaData
}