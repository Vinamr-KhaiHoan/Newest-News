import { Router } from 'express'
import { verifyWebhook, recieveAndSend, test } from '../controller/webhook-controller'



const webhookRouter = Router()

webhookRouter.get('/webhook', verifyWebhook)

webhookRouter.post('/webhook', recieveAndSend)

webhookRouter.get('/test', test)

export { webhookRouter }
