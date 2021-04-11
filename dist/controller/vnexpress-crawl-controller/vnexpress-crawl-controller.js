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
exports.crawlVnexpress = void 0;
const type_1 = require("./type");
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
function crawlVnexpress(subject) {
    return __awaiter(this, void 0, void 0, function* () {
        subject = type_1.VNEXPRESS_SUBJECT.get(subject);
        if (subject === null) {
            return null;
        }
        const url = type_1.VNEXPRESS_HOMEPAGE + subject;
        try {
            const { data } = yield axios_1.default.get(url);
            const selector = cheerio_1.default.load(data);
            const searchResult = selector('body')
                .find('section[class="section section_topstory section_topstory_folder"] > div[class="container flexbox"]')
                .find('div[class="col-left-top"] > div[class="wrapper-topstory-folder wrapper-topstory-folder-v2 flexbox width_common"]')
                .find('article[class="item-news full-thumb article-topstory"] > div[class="thumb-art"]')
                .find('a').attr('href');
            console.log(searchResult);
            return searchResult;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.crawlVnexpress = crawlVnexpress;
//# sourceMappingURL=vnexpress-crawl-controller.js.map