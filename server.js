import express from 'express'
import dotenv from 'dotenv'
import aws from 'aws-sdk'
import bodyParser from 'body-parser'
import cors from 'cors'

// Routes
import emailRoute from './src/email_route.js'

// Middleware
import recaptchaMiddleware from './src/middleware/recaptcha_verify.js'

// Init setup
dotenv.config()
aws.config.update({region: process.env.AWS_REGION})

// App port
const port = process.env.PORT || 3000

// Express App
const app = express()

// Middlewares
app.use(cors({ origin: '*' }))
app.use(bodyParser.json())

// Express Routes
app.post('/email', recaptchaMiddleware(process.env.RECAPTCHA_SECRET), emailRoute)

// App init
app.listen(port, () => {})