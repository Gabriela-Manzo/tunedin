const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

const enviar = async ({ destinatario, remetente, assunto, corpo }) => {

  const msg = {
    to: destinatario, 
    from: remetente,
    subject: assunto,
    text: corpo,
    // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }

  await sendgrid.send(msg)

  console.log('E-MAIL ENVIADO');

}

module.exports = {
  enviar,
}

