const postData = (model) => {
  const {  _id, usuario, categoria, descricao, status } = model

  return {
    id: _id,
    usuarioId: usuario,
    // categoriaNome: categoria.nome,
    categoriaId: categoria,
    descricao,
    status
  }
}

module.exports = {
  postData
}