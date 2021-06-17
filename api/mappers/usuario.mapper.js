const userTipo = (tipo) => {
    switch (tipo) {
        case "administrador":
            return 1;
        
        case "musico":
            return 2;

        case "cliente":
            return 3;
            
        default:
            break;
    }
}

const userData = (model) => {
    const { id, email, kind, nome } = model;

    return {
        id,
        email,
        nome: nome,
        tipoUsuario: userTipo(kind),
    }
}

module.exports = {
    userData
}