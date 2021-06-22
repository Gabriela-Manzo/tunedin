const formidable = require('formidable')
const fileUtils = require('../file.utils')
const path = require('path')

const fileUpload = (destino, isUpdate = false) => {
    const form = formidable.IncomingForm();
    form.uploadDir = fileUtils.criarEnd('temp')
    
    return (req, res, next) => {
        form.parse(req, (err, fields, files) => {

            req.body = {
                ...fields
            }
            
            if((!files.imagem || files.imagem.nomeOriginal === '') && !isUpdate) {

                return res.status(400).send({
                    mensagem: 'não foi possível realizar a operação',
                    detalhes: [
                        '"imagem" é de preenchimento obrigatório'
                    ]
                });
            }

            if (files.imagem && files.imagem.nomeOriginal !== '') {
        
                const novoNome = fileUtils.criarNome(files.imagem.type);
                const novoCaminho = fileUtils.criarEnd(destino, novoNome)

                req.body.imagem = {
                 tipo: files.imagem.type,
                 nomeOriginal: files.imagem.nomeOriginal,
                 caminhoOriginal: files.imagem.path,
                 novoNome,
                 novoCaminho
                }
            }
            
            return next();
        });
        
    }
}

module.exports = fileUpload