import { Request, Response } from "express";
import { VERIFIED_WEBHOOK_CODE, FacebookMessageInputAttributes, FacebookMessageData, FacebookMessage } from "./types";
import { crawl, sendMessage, ResponseInput } from "./crawl-controller";
import axios from "axios"

export async function verifyWebhook(req: Request, res: Response): Promise<Response> {
    console.log(req.query['hub.verify_token'])
    const isVerified = req.query['hub.verify_token'] === VERIFIED_WEBHOOK_CODE
    console.log(isVerified)
    if (isVerified) {
        console.log(`webhook is verified`)

        return res.send(req.query['hub.challenge']);
    }

    return res.send('Error, wrong validation token');
}

export async function recieveAndSend(req: Request, res: Response): Promise<Response> {
    try {
        const entries = req.body.entry;

        for (var entry of entries) {
            var messaging = entry.messaging;
            for (var message of messaging) {
                var senderId = message.sender.id;
                if (message.message) {
                    // If user send text
                    if (message.message.text) {
                        var text = message.message.text;
                        console.log(text);
                        const url = await crawl(text)
                        console.log(url)
                        const data: ResponseInput = {
                            messaging_type: "RESPONSE",
                            recipient: { id: senderId },
                            message: { text: url }
                        }
                        await sendMessage(data)
                    }
                }
            }
        }
        return res.status(200).send('EVENT_RECEIVED');
    }
    catch (error) {
        console.log(error)
        return res.sendStatus(404);
    }
}

import { crawlTest } from './vnexpress-crawl-controller/vnexpress-crawl-controller'

export async function test(req: Request, res: Response): Promise<Response> {
    const result = await crawlTest

    return res.status(200).json({ message: result })
}
