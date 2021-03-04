"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const webhook_router_1 = require("./router/webhook-router");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const app = express_1.default();
const PORT = 3000;
app.use(body_parser_1.default.urlencoded());
app.use(body_parser_1.default.json());
app.use(morgan_1.default('dev'));
app.use(cors_1.default());
app.get('/', (req, res) => {
    console.log(`welcome to chatbot`);
    res.status(200).json({ message: `welcome to chatbot` });
});
app.use(webhook_router_1.webhookRouter);
app.listen(PORT, () => {
    console.log(`this app is listenning on PORT ${PORT}`);
});
//# sourceMappingURL=app.js.map