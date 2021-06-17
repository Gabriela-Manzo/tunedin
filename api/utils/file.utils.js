const path = require('path')
const endRaiz = process.env.FILE_BASE_PATH
const fs = require('fs')
const uuid = require('uuid').v4

const criarEnd = (destino, arquivoNome = "") => {
    return path.join(endRaiz, destino, arquivoNome);
}

const criaEndDownload = (origem, arquivoNome) => {
    return path.join('/static', origem, arquivoNome);
  }
  

const criarNome = (tipo) => {
    const tipoTratado = tipo.split('/')[1];
    return `${uuid()}.${tipoTratado}`
  }

const mover = (temporario, definitivo) => {
    return fs.renameSync(temporario, definitivo);
}

const remover = (origem, arquivo) => {
    const enderecoArquivo = criarEnd(origem, arquivo);
  
    if (fs.existsSync(enderecoArquivo))
      fs.unlinkSync(enderecoArquivo);
  
    return;
  }
  

module.exports = {
    criarEnd,
    criarNome,
    mover,
    criaEndDownload,
    remover
}