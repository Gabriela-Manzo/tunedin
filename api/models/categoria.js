
const categoriaSchema = {
    nome: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
    imagem: {
      originalname: {
        type: String,
        required: false,
      },
      nome: {
        type: String,
        required: false,
      },
      tipo: {
        type: String,
        required: false,
      },
    }  
}

module.exports = categoriaSchema