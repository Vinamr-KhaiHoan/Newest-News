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
exports.crawlVietcetera = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const type_1 = require("./type");
function crawlVietcetera(subject) {
    return __awaiter(this, void 0, void 0, function* () {
        subject = type_1.Subject.get(subject);
        const url = type_1.VIETCETERA_HOMEPAGE + subject;
        try {
            const { data } = yield axios_1.default.get(url);
            const selector = cheerio_1.default.load(data);
            const searchResult = selector("body")
                .find("div[id='__next'] > main[class='layout-content ant-layout-content'] > div[class='wrap-content'] > div[class='category-page']")
                .find("div[id='listNewArticle'] > div[id='listPopularArticleMobile'] > div[class='ant-card verticle-card verticle-card-md ant-card-bordered']")
                .find("div[class='ant-card-body']").find('a').attr('href');
            if (!searchResult) {
                return `we don't support this type.`;
            }
            return `vietcetera.com` + searchResult;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.crawlVietcetera = crawlVietcetera;
//# sourceMappingURL=vietcetera-crawl-controller.js.map