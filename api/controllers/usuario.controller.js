const usuarioService = require('../services/usuario.service')

const auth = async (req, res, next) => {
    const { email, senha } = req.body;

    const resultService = await usuarioService.autenticar(email, senha);

    const codigoRetorno = resultService.sucesso ? 200 : 401;
    const dadoRetorno = resultService.sucesso ? { data: resultService.data } : { detalhes: resultService.detalhes };

    return res.status(codigoRetorno).send({
        mensagem: resultService.mensagem,
        ...dadoRetorno
    });
}

module.exports = {
    auth,
}