import express from 'express'
import { webhookRouter } from './router/webhook-router'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'

const app = express();

const PORT = 3000;

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.use(morgan('dev'))
app.use(cors())

app.get('/', (req, res) => {
    console.log(`welcome to chatbot`)
    res.status(200).json({ message: `welcome to chatbot` })
})

app.use(webhookRouter)

app.listen(PORT, () => {
    console.log(`this app is listenning on PORT ${PORT}`)
})
