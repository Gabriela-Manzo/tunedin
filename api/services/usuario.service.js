const { usuario } = require('../models/index')
const criptografia = require('../utils/criptografia')
const usuarioMapper = require('../mappers/usuario.mapper')

const perfis = [
    {
      id: '1',
      descricao: 'administrador',
      funcionalidades: [
        'ALTERA_CATEGORIA',
        'CRIA_CATEGORIA',
        'PESQUISA_CATEGORIA',
        'REMOVE_CATEGORIA',
        'PESQUISA_MUSICO',
        'PESQUISA_MUSICO_ID',
        'PESQUISA_MUSICO_CATEGORIA',
        'ATIVAR_CLIENTE',
        'INATIVAR_CLIENTE',
        'PESQUISA_CLIENTE',
      ]
    },
    {
      id: '2',
      descricao: 'musicos',
      funcionalidades: [
        'ALTERA_MUSICOS',
        'PESQUISA_MUSICOS_ID',
        'PESQUISA_ANUNCIOS',
        'PESQUISA CLIENTES',
        'CRIA_ANUNCIOS',
        'REMOVE_ANUNCIOS',
        'PESQUISA_MUSICOS_CATEGORIA',
      ]
    },
    {
      id: '3',
      descricao: 'cliente',
      funcionalidades: [
      ]
    },
  ];
  

const userExiste = async (email, senha) => {
    return await usuario.findOne({ email, senha: criptografia.criarHash(senha) }) ? true : false;
}

const validaEmail = async (email) => {

    const usuarios = await usuario.find({ email });
  
    return usuarios.length > 0 ? true : false;
  
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

const buscarPefilPorId = (perfilId) => {
    const result = perfis.find(item => Number(item.id) === Number(perfilId));
    return result;
  }
  
const validaFuncionalidadeNoPerfil = (perfilId, funcionalidade) => {
    const perfil = buscarPefilPorId(perfilId);
    return perfil.funcionalidades.includes(funcionalidade);
  }

const buscaTipoUsuarioPorId = (tipoUsuarioId) => {
    return perfis.find(item => {
      return item.id === tipoUsuarioId
    })
  
  }
  

module.exports = {
    autenticar,
    cria,
    validaEmail,
    validaFuncionalidadeNoPerfil,
    buscaTipoUsuarioPorId
}