const formidable = require('formidable')
const fileUtils = require('../file.utils')

const fileUpload = (destino) => {
    const form = formidable.IncomingForm({ keepExtensions: true });
    form.uploadDir = fileUtils.criarEnd('temp')
    
    return (req, res, next) => {
        form.parse(req, (err, fields, files) => {
            
            if(!files.imagem) {
                return res.status(400).send({
                    mensagem: 'não foi possível realizar a operação',
                    detalhes: [
                        '"imagem" é de preenchimento obrigatório'
                    ]
                });
            }
        
            const novoNome = fileUtils.criarNome(files.imagem.type);
            const novoCaminho = fileUtils.criarEnd(destino, novoNome)

            req.body = {
                ...fields,
                imagem: {
                    tipo: files.imagem.type,
                    nomeOriginal: files.imagem.originalname,
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