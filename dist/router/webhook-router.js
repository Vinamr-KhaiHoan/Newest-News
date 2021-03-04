"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookRouter = void 0;
const express_1 = require("express");
const webhook_controller_1 = require("../controller/webhook-controller");
const webhookRouter = express_1.Router();
exports.webhookRouter = webhookRouter;
webhookRouter.get('/webhook', webhook_controller_1.verifyWebhook);
webhookRouter.post('/webhook', webhook_controller_1.recieveAndSend);
//# sourceMappingURL=webhook-router.js.map