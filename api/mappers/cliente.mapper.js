const clienteData = (model) => {
    const{  _id, nome, descricao, cnpj, endereco, cidade, telefone, status } = model
    
    return{
        id: _id,
        nome,
        descricao,
        cnpj,
        endereco,
        cidade,
        telefone,
        status,
    }
}

module.exports = {
    clienteData
}
