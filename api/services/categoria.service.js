const { categoria } = require('../models/index')
const categoriaMapper = require('../mappers/categoria.mapper')

const listarTodas = async () => {
    const listaDB = await categoria.find({});

    return listaDB.map(categoriaDB => {
        return categoriaMapper.categoriaData(categoriaDB)
    })
}

const criarCategoria = async (model) => {
    const novaCategoria = await categoria.create({
        nome: model.nome,
        descricao: model.descricao,
        status: model.status
    })
    
    return{
        sucesso: true,
        mensagem: 'cadstro realizado com sucesso',
        data: categoriaMapper.categoriaData(novaCategoria)
    }
}
    

module.exports = {
    listarTodas,
    criarCategoria

}