"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recieveAndSend = exports.verifyWebhook = void 0;
const types_1 = require("./types");
const crawl_controller_1 = require("./crawl-controller");
function verifyWebhook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.query['hub.verify_token']);
        const isVerified = req.query['hub.verify_token'] === types_1.VERIFIED_WEBHOOK_CODE;
        console.log(isVerified);
        if (isVerified) {
            console.log(`webhook is verified`);
            return res.send(req.query['hub.challenge']);
        }
        return res.send('Error, wrong validation token');
    });
}
exports.verifyWebhook = verifyWebhook;
function recieveAndSend(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
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
                            const url = yield crawl_controller_1.crawl(text);
                            console.log(url);
                            const data = {
                                messaging_type: "RESPONSE",
                                recipient: { id: senderId },
                                message: { text: url }
                            };
                            yield crawl_controller_1.sendMessage(data);
                        }
                    }
                }
            }
            // console.log(req.body)
            // // // console.log(req.body.entry[0].messaging[0])
            // // console.log(`running`)
            // const body = req.body as FacebookMessageInputAttributes
            // const entries = body.entry
            // console.log(entries)
            // // return
            // let messagings: FacebookMessageData[][]
            // entries.forEach(entry => {
            //     console.log(entry)
            //     console.log(entry.messaging)
            //     messagings.push(entry.messaging)
            // })
            // console.log(messagings)
            // // for (let messaging of messagings) {
            // //     const senderID = messaging.sender
            // //     const message = messaging.message
            // //     console.log(message)
            // // const url = await crawl(message.text)
            // // const dataInput: ResponseInput = {
            // //     message_type: "RESPONSE",
            // //     recipient: senderID,
            // //     message: { text: url }
            // // }
            // // await sendMessage(dataInput)
            // // }
            return res.status(200).send('EVENT_RECEIVED');
        }
        catch (error) {
            console.log(error);
            return res.sendStatus(404);
        }
    });
}
exports.recieveAndSend = recieveAndSend;
//# sourceMappingURL=webhook-controller.js.map