"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crawler_router_1 = require("./router/crawler-router");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
const PORT = 3000;
app.use(body_parser_1.default.urlencoded());
app.use(body_parser_1.default.json());
app.use(cors_1.default());
app.use(crawler_router_1.router);
app.listen(PORT, () => {
    console.log(`this app is listenning on PORT ${PORT}`);
});
//# sourceMappingURL=app.js.map