const clienteData = (model) => {
    const{  _id, nome, descricao, endereco, uf, cidade, telefone, status } = model
    
    return{
        id: _id,
        nome,
        descricao,
        endereco,
        uf,
        cidade,
        telefone,
        status,
    }
}

module.exports = {
    clienteData
}
