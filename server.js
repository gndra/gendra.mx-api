import express from 'express'
import dotenv from 'dotenv'
import aws from 'aws-sdk'
import bodyParser from 'body-parser'

import emailSender from './src/email_sender.js'

dotenv.config()

aws.config.update({region: process.env.AWS_REGION})

const port = process.env.PORT || 3000

const app = express()

app.use(bodyParser.json())

app.post('/email', emailSender)

app.listen(port, () => {
  console.log(`Listen on port ${port}`)
})