
const categoriaSchema = {
    nome: {
      type: String,
      required: true,
    },
    descricao: {
      type: String,
      required: false,
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
      type: {
        type: String,
        required: false,
      },
    }  
}

module.exports = categoriaSchema