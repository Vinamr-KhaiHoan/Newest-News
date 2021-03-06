"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crawlRouter = void 0;
const express_1 = __importDefault(require("express"));
const crawl_controller_1 = require("../controller/crawl-controller");
const crawlRouter = express_1.default.Router();
exports.crawlRouter = crawlRouter;
crawlRouter.get('/crawl', crawl_controller_1.crawl);
//# sourceMappingURL=crawler-router.js.map