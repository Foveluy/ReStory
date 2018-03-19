import { BaseManager } from "./base";

export class CategoryManager extends BaseManager {

    *getCategory(url) {
        return yield this.Get(url)
    }

}