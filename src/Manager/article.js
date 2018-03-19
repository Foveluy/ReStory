import { BaseManager } from "./base";

export class ArticleManager extends BaseManager {

    *postArticle(url, body) {
        return yield this.fetch(url, body)
    }

    *getArticle(url) {
        return yield this.Get(url)
    }
    *deleteArticle(body) {
        return yield this.delete('/article', body);
    }
    *getOneArticle(url) {
        return yield this.Get(url)
    }

}