import { BaseManager } from './base'

export class UserManager extends BaseManager {
    *userLogin(body) {
        return yield this.fetchNoHeader('/login', body)
    }
    *auth() {
        return yield this.Get('/auth')
    }
}
