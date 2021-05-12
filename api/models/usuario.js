const userSchema = {
    email: {
        type: String,
        required: true,
    },
    senha: {
        type: String,
        required: true,
    },
}

module.exports = userSchema