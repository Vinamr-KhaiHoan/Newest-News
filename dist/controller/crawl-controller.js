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
exports.execute = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const types_1 = require("./types");
function execute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let subject = req.query.subject;
        if (!types_1.Subject.has(subject)) {
            return res.status(500).json({
                message: "Xin loi chatbot ko ho tro chuyen muc nay."
            });
        }
        subject = types_1.Subject.get(subject);
        const url = types_1.VIETCETERA_HOMEPAGE + subject;
        try {
            const { data } = yield axios_1.default.get(url);
            const selector = cheerio_1.default.load(data);
            const searchResult = selector("body")
                .find("div[id='__next'] > main[class='layout-content ant-layout-content'] > div[class='wrap-content'] > div[class='category-page']")
                .find("div[id='listNewArticle'] > div[id='listPopularArticleMobile'] > div[class='ant-card verticle-card verticle-card-md ant-card-bordered']")
                .find("div[class='ant-card-body']").find('a').attr('href');
            return res.status(200).json({ url: `https://vietcetera.com/vn/chuyen-muc` + searchResult });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.execute = execute;
//# sourceMappingURL=crawl-controller.js.map