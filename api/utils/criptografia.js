const md5 = require('md5');
const jwt = require('jsonwebtoken')

const hashSecret = process.env.MD5_SECRET
const jwtSecret = process.env.JWT_SECRET

const criarHash = (senha) => {

    return md5(senha + hashSecret);
}

const criarToken = (model) => {
    return jwt.sign({...model}), jwtSecret, {
        expiresIn: `${process.env.JWT_VALID_TIME}`
    }
}

const validarToken = (token) => {
    try {
        return jwt.verify(token, jwtSecret)
    } catch (error) {
        return undefined
    }
}

module.exports = {
    criarHash,
    criarToken,
    validarToken
}