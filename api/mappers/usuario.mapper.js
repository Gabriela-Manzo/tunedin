const userTipo = (tipo) => {
    switch (tipo) {
        case "administrador":
            return 1;
        
        case "musicos":
            return 2;

        case "cliente":
            return 3;
            
        default:
            break;
    }
}

const userData = (model) => {
    const { id, email, kind, nome, ...resto} = model;

    return {
        id,
        email,
        nome: nome,
        tipoUsuario: userTipo(kind),
        ...resto
    }
}

module.exports = {
    userData
}