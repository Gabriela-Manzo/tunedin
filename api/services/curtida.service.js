const { cliente, musicos, curtida } = require('../models/index')

const cria = async (musicosid, clienteid) => {
  const [musicosDB, clienteDB] = await Promise.all([
    cliente.findById(clienteid),
    musicos.findById(musicosid)
  ])

  if (!musicosDB) {
    return {
      sucesso: false,
      mensagem: 'operação não pode ser realizada',
      detalhes: [
        'o musico pesquisado não existe'
      ]
    }
  }

  const curtidasDB = await curtida.create({
    musicos: musicosid,
    post: postid
  })

  musicosDB.curtidas = [...musicosDB.curtidas, curtidasDB._id]
  clienteDB.curtidas = [...clienteDB.curtidas, curtidasDB._id]

  await Promise.all([
    musicosDB.save(),
    clienteDB.save()
  ])

  return {
    sucesso: true,
    data: {
      id: curtidasDB._id,
      musico: musicosDB.nome,
      cliente: clienteDB.nome
    }
  }
}

const remove = async (musicosid, clienteid) => {
  const [musicosDB, clienteDB, curtidasDB] = await Promise.all([
    musicos.findById(musicosid),
    cliente.findById(clienteid),
    curtida.findOne({ musico: musicosid, cliente: clienteid})
  ])

  if(!musicosDB) {
    return {
      sucesso: false,
      mensagem: 'operação não pode ser realizada',
      detalhes: [
        'o musico informado não existe'
      ]
    }
  }

  if (!curtidasDB) {
    return {
      sucesso: false,
      mensagem: 'operação não pode ser realizada',
      detalhes: [
        'não existem curtidas para os dados informados'
      ]
    }
  }

  musicosDB.curtidas = musicosDB.curtidas.filter(item => {
    return item.toString() !== curtidasDB._id.toString();
  })

  const curtidas_id = curtidasDB._id.toString()

  clienteDB.curtidas = clienteDB.curtidas.filter(item => {
    return item.toString() !== curtidasDB._id.toString();
  })

  await Promise.all([
    musicosDB.save(),
    clienteDB.save(),
    curtida.remove(curtidasDB)
  ])

  return {
    sucesso: true,
    mensagem: "operação realizada com sucesso",
    data: {
      id: curtidas_id
    }
  }
}

module.exports = {
  cria,
  remove
}