import express from 'express'
import { router } from './router/crawler-router';
import bodyParser from 'body-parser'
import cors from 'cors'

const app = express();

const PORT= 3000;

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.use(cors())

app.use(router)

app.listen(PORT, () => {
    console.log(`this app is listenning on PORT ${PORT}`)
})
