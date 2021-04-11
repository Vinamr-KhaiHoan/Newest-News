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
            console.log(`entries thay hung: `, entries);
            for (var entry of entries) {
                var messaging = entry.messaging;
                for (var message of messaging) {
                    console.log(`messaging: `, message);
                    var senderId = message.sender.id;
                    if (message.message) {
                        console.log(`message: `, message);
                        // If user send text
                        if (message.message.text) {
                            var text = message.message.text;
                            console.log(text);
                            const urls = yield crawl_controller_1.crawlAll(text);
                            console.log(urls);
                            const promises = urls.map((url) => __awaiter(this, void 0, void 0, function* () {
                                const data = {
                                    messaging_type: "RESPONSE",
                                    recipient: { id: senderId },
                                    message: { text: url }
                                };
                                yield crawl_controller_1.sendMessage(data);
                            }));
                            const solved = yield Promise.all(promises);
                        }
                    }
                }
            }
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