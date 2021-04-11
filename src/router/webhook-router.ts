import { Router } from 'express'
import { verifyWebhook, recieveAndSend } from '../controller/webhook-controller'



const webhookRouter = Router()

webhookRouter.get('/webhook', verifyWebhook)

webhookRouter.post('/webhook', recieveAndSend)

export { webhookRouter }
