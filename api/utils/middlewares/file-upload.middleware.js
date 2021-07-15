const formidable = require('formidable')
const fileUtils = require('../file.utils')
const path = require('path')

const postIsValid = (files) => {
    if ((!files.imagem || files.imagem.name === '')) {
      return false
    }
    return true;
}
  
const fileUpload = (destino, isUpdate = false) => {
    return async (req, res, next) => {
        const form = formidable.IncomingForm();
        form.uploadDir = fileUtils.criarEnd('temp')
        var formfields = await new Promise(function (resolve, reject) {
            form.parse(req, (err, fields, files) => {
                if (err) { 
                    return reject(err)
                }
                resolve({
                    ...fields,
                    files
                });
            });
        });
        const { files, ...fields } = formfields
        req.body = {
            ...fields,
        }
        if (req.method === 'POST') {
            console.log(fields);
            if(!postIsValid(files))
            throw new Error('"imagem" é de preenchimento obrigatório.')
        }
        if (files.imagem && files.imagem.name !== '') {
            const novoNome = fileUtils.criarNome(files.imagem.type);
            const novoCaminho = fileUtils.criarEnd(destino, novoNome)
        
            req.body.imagem = {
            type: files.imagem.type,
            nomeOriginal: files.imagem.nomeOriginal,
            caminhoOriginal: files.imagem.path,
            novoNome,
            novoCaminho
            }
        }

        next()
    }
}

module.exports = fileUpload