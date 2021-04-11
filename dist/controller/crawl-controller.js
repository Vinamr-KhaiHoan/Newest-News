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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.crawlAll = void 0;
const axios_1 = __importDefault(require("axios"));
const types_1 = require("./types");
const vietcetera_crawl_controller_1 = require("./vietceteta-crawl-controller/vietcetera-crawl-controller");
const vnexpress_crawl_controller_1 = require("./vnexpress-crawl-controller/vnexpress-crawl-controller");
function crawlAll(subject) {
    return __awaiter(this, void 0, void 0, function* () {
        let url = [];
        const vietceteraUrl = yield vietcetera_crawl_controller_1.crawlVietcetera(subject);
        if (vietceteraUrl) {
            url.push(vietceteraUrl);
        }
        const vnexpressUrl = yield vnexpress_crawl_controller_1.crawlVnexpress(subject);
        if (vnexpressUrl) {
            url.push(vnexpressUrl);
        }
        return url;
    });
}
exports.crawlAll = crawlAll;
function sendMessage(data) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`post data`);
        const url = `${types_1.FACEBOOK_SEND_MESSAGE_URL}=${types_1.FACEBOOK_VERIFIED_TOKEN}`;
        console.log(`url: `, url, `data `, data);
        const response = yield axios_1.default.post(url, data, {
            headers: { "Content-Type": "application/json" }
        });
    });
}
exports.sendMessage = sendMessage;
//# sourceMappingURL=crawl-controller.js.map