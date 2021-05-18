const userTipo = (tipo) => {
    switch (tipo) {
        case "administrador":
            return 1
        default:
            break;
    }
}

const userData = (model) => {
    const { id, email, kind, nome, nomeFantasia } = model;

    return {
        id,
        email,
        nome: nome ? nome : nomeFantasia,
        tipoUsuario: userTipo(kind),
    }
}

module.exports = {
    userData
}