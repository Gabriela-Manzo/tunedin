const criptografia = require('../criptografia');
const usuarioService = require('../../services/usuario.service');

const autorizar = (rota = '*') => {

  return async (req, res, next) => {

    const { token } = req.headers;

    if (!token) {
      return res.status(403).send({
        mensagem: "usuário não autorizado."
      })
    }

    if (!criptografia.validarToken(token)) {
      return res.status(401).send({ 
        mensagem: "usuário não autenticado." });
    }


    const { id, email, tipoUsuario } = criptografia.decodificaToken(token);
    
    if (!(await usuarioService.validaEmail(email))) {
      return res.status(403).send({
        mensagem: "usuário não autorizado."
      })
    }

    if (rota != '*') {

      if (!usuarioService.buscaTipoUsuario(tipoUsuario, rota))
        return res.status(403).send({
          mensagem: "usuário não autorizado."
        })

    }

   
    req.usuario = {
      id,
      email,
      tipoUsuario,
    }


    return next();

  }

}

module.exports = autorizar;

