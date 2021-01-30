import aws from 'aws-sdk'

aws.config.update({ region: process.env.AWS_REGION || 'us-west-2' })

const awsEmail = new aws.SES({apiVersion: '2010-12-01'})

const emailBody = (name, lastName, email, company, phone, body, heardOf) => ({
  Destination: {
    ToAddresses: [
      email
    ]
  },
  Message: {
    Body: {
      Html: {
        Charset: "UTF-8",
        Data: "HTML_FORMAT_BODY"
      },
      Text: {
        Charset: "UTF-8",
        Data: "TEXT_FORMAT_BODY"
      }
    },
    Subject: {
      Charset: 'UTF-8',
      Data: 'Test email'
    }
  },
  Source: 'no-reply@gendra.mx'
})

export default async (req, res) => {
  console.log(req.body)
  const { name, lastName, email, company, phone, body, heardOf } = req.body

  await awsEmail.sendEmail(emailBody(
    name,
    lastName,
    email,
    company,
    phone,
    body,
    heardOf
  )).promise();

  return res.send({ test: true })
}
