const musicosService = require('../services/musicos.service')

const listar = async (req, res, next) => {
    const result = await musicosService.listarTodos();
    
    return res.status(200).send({data: result})
};

const criar = async (req, res, next) => {
    const { body } = req;
    
    const resultService = await musicosService.criarPerfil(body)

    const codigoRetorno = resultService.sucesso ? 200 : 401;
    const dadoRetorno = resultService.sucesso ? { data: resultService.data } : { detalhes: resultService.detalhes };

    return res.status(codigoRetorno).send(dadoRetorno);
}

// const buscarMusicosByCategoria = async (req, res, next) => {
//     const { body } = req

//     const data = await musicosService.listaMusicoByCategoria(body.categoria)

//     return res.status(200).send({
//         data,
//     })
// }

module.exports = {
    listar,
    criar,
    // buscarMusicosByCategoria
}