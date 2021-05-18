const { usuario } = require('../models/index')
const criptografia = require('../utils/criptografia')
const usuarioMapper = require('../mappers/usuario.mapper')

const userExiste = async (email, senha) => {
    return await usuario.findOne({ email, senha: criptografia.criarHash(senha) }) ? true : false;
}

const credencial = async (usuarioEmail) => {
    const userDB = await usuario.findOne({
        email: usuarioEmail
    });
    
    const userDTO = usuarioMapper.userData(userDB)
    return {
        token: criptografia.criarToken(userDTO),
        userDTO,
    }
}

const autenticar = async (email, senha) => {
    const resultDB = await userExiste(email, senha);

    if(!resultDB){
        return{
            sucesso: false,
            mensagem: "não foi possivel autenticar o usuario",
            detalhes: [
                "usuário ou senha inválidos",
            ],
        }
    }

    return {
        sucesso: true,
        mensagem: "usuário autenticado com sucesso",
        data: await credencial(email)
    }

}

const cria = async () => {

    return usuario.create({
      email: 'teste@teste.com',
      senha: md5(`123456${process.env.MD5_SECRET}`)
    });
  
  }
  

module.exports = {
    autenticar,
    cria
}