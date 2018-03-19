import { BaseManager } from "./base";

export class CommentManager extends BaseManager {

    *postComment(url, body) {
        return yield this.fetch(url, body)
    }

}