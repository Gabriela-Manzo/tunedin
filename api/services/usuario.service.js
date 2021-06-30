const { usuario } = require('../models/index')
const criptografia = require('../utils/criptografia')
const usuarioMapper = require('../mappers/usuario.mapper')
const musicoMapper = require('../mappers/musicos.mapper')

const perfis = [
    {
      id: 1,
      descricao: 'administrador',
      funcionalidades: [
        'CRIA_CATEGORIA',
        'ALTERA_CATEGORIA',
        'PESQUISA_CATEGORIA',
        'REMOVE_CATEGORIA',
        'PESQUISA_MUSICO',
        'PESQUISA_MUSICO_ID',
        'ATIVAR_MUSICO',
        'INATIVAR_MUSICO',
        'ATIVAR_CLIENTE',
        'INATIVAR_CLIENTE',
        'PESQUISA_CLIENTE',
        'PESQUISA_POST'
      ]
    },
    {
      id: 2,
      descricao: 'musicos',
      funcionalidades: [
        'ALTERA_MUSICOS',
        'PESQUISA_MUSICO',
        'PESQUISA_MUSICO_ID',
        'PESQUISA_POST',
        'PESQUISA_CLIENTES',
        'CRIA_POST',
        'PESQUISA_POST_MUSICOS',
        'REMOVE_POST',
      ]
    },
    {
      id: 3,
      descricao: 'cliente',
      funcionalidades: [
        'PESQUISA_MUSICOS_ID',
        'PESQUISA_MUSICO',
        'PESQUISA_POST',
        'CRIA_CURTIDA',
        'REMOVE_CURTIDA'
      ]
    },
  ];
  

const cria = async () => {

    return usuario.create({
      email: 'teste@teste.com',
      senha: md5(`123456${process.env.MD5_SECRET}`)
    });
  
}

const credencial = async (usuarioEmail, tipoUsuario) => {
  const userDB = await usuario.findOne({
      email: usuarioEmail,
      tipoUsuario
  });

  const userDTO = usuarioMapper.userData(userDB)
  return {
      token: criptografia.criarToken(userDTO),
      userDTO,
  }
}

const userExiste = async (email, senha) => {
    return await usuario.findOne({ email, senha: criptografia.criarHash(senha) })
}

const validaEmail = async (email) => {

    const usuarios = await usuario.find({ email });
  
    return usuarios.length > 0 ? true : false;
  
  }

const validaSeUsuarioValido = async (usuario) => {
    
    if (!usuario)
    return false;
    
    if (usuario.kind === "musicos")
      return usuario.status === "Ativo" ? true : false;
    
    if (usuario.kind === "cliente")
      return usuario.status === "Ativo" ? true : false;
    
    return true;
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

    if(!(await validaSeUsuarioValido(resultDB))){
      return{
        sucesso: false,
        mensagem: "não foi possivel autenticar o usuario",
        detalhes: [
          "usuário ou senha inválidos"
        ]
      }
    }

    return {
        sucesso: true,
        mensagem: "usuário autenticado com sucesso",
        data: await credencial(email)
    }

}

const buscaTipoUsuario = (tipoUsuario) => {
    return perfis.find(item => {
      return item.id === tipoUsuario
    })    
}

// const buscarPefilPorId = (perfilId) => {
//   const result = perfis.find(item => Number(item.id) === Number(perfilId));
//   return result;
// }

// const validaFuncionalidadeNoPerfil = (perfilId, funcionalidade) => {
//   const perfilporId = buscarPefilPorId(perfilId);
//   return perfilporId.funcionalidades.includes(funcionalidade)
// }

module.exports = {
    autenticar,
    cria,
    validaEmail,
    // validaFuncionalidadeNoPerfil,
    buscaTipoUsuario,
    validaSeUsuarioValido
}