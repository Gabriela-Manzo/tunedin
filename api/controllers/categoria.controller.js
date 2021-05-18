const categoriaService = require('../services/categoria.service')

const listar = async (req, res, next) => {
    const result = await categoriaService.listarTodas();
    
    return res.status(200).send({data: result})
}

const criar = async (req, res, next) => {
    const { body } = req;
    
    const resultService = categoriaService.criarCategoria(body)

    const codigoRetorno = resultService.sucesso ? 200 : 401;
    const dadoRetorno = resultService.sucesso ? { data: resultService.data } : { detalhes: resultService.detalhes };

    return res.status(codigoRetorno).send({
        mensagem: resultService.mensagem,
        ...dadoRetorno
    });
}

const altera = (req, res, next) => {
    return res.status(200)
}

const buscaPorId = (req, res, next) => {
    return res.status(200).send([])
}

const deleta = (req, res, next) => {
    return res.status(200)
}
module.exports = {
    listar,
    criar,
    altera,
    buscaPorId,
    deleta
}