const categoriaData = (model) => {
    const { _id, nome, status } = model

    return {
        id: _id,
        nome,
        status
    }
}

module.exports = {
    categoriaData
}