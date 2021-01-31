import aws from 'aws-sdk'

aws.config.update({ region: process.env.AWS_REGION || 'us-west-2' })

const awsEmail = new aws.SES({apiVersion: '2010-12-01'})

const emailBody = (name, lastName, email, company, phone, body) => ({
  Destination: {
    ToAddresses: [
      'jorge@gendra.dev',
      'erick.perez@gendra.mx'
    ]
  },
  Message: {
    Body: {
      Html: {
        Charset: "UTF-8",
        Data: `
          <html lang="es">
              <head>
                  <meta charset="UTF-8">
              <body>
                  <p>Hay un nuevo contacto en la página de gendra.mx</p>
                  <ul>
                      <li>Nombre: ${name}</li>
                      <li>Apellido: ${lastName}</li>
                      <li>Correo: ${email}</li>
                      <li>Compañia: ${company}</li>
                      <li>Teléfono: ${phone}</li>
                      <li>Mensaje: <p>${body}</p></li>
                  </ul>
              </body>
          </html>
        `
      },
      Text: {
        Charset: "UTF-8",
        Data: `Hay un nuevo contacto en la página de gendra.mx\nNombre: ${name}\nApellido: ${lastName}\nCorreo: ${email}\nCompañia: ${company}\nTeléfono: ${phone}\nMensaje: ${body}`
      }
    },
    Subject: {
      Charset: 'UTF-8',
      Data: 'Nuevo contacto - gendra.mx'
    }
  },
  Source: 'no-reply@gendra.mx',
  SourceArn: process.env.AWS_SES_SOURCE_ARN
})

export default async (req, res) => {
  const { name, lastName, email, company, phone, body } = req.body

  await awsEmail.sendEmail(emailBody(
    name,
    lastName,
    email,
    company,
    phone,
    body
  )).promise();

  return res.send({ test: true })
}
