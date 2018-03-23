import { call } from 'redux-saga/effects'
import { loadingManager } from '../utils/utils';

const win = window

export class BaseManager {
    constructor() {
        this.call = call //for saga

        if (!win['$trumpDoc']) {
            win['$trumpDoc'] = {}
        }

        this.user = win['$trumpDoc'].user
        this.repo = win['$trumpDoc'].repo

        this.domain =
            process.env.NODE_ENV === 'production'
                ? `https://${this.user}.github.io/${this.repo}/`
                : `http://127.0.0.1:54321/`
    }

    isDev = () => {
        if (process.env.NODE_ENV === 'production') return false
        return true
    };

    *Get(url) {
        try {
            const option = {
                method: 'GET'
            }

            yield loadingManager.show()
            const res = yield this.call(fetch, this.domain + url, option)
            yield loadingManager.hide()

            const buffer = yield res.arrayBuffer()
            console.log(res)
            const string = new TextDecoder('utf-8').decode(buffer)
            return string
        } catch (e) {
            console.log(e)
        }
    }

    *fetch(url, body) {
        try {
            const res = yield this.call(fetch, this.domain + url, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'token ' + this.token
                }
            })
            this.loginFail(res.status)
            const json = yield res.json()
            return json
        } catch (e) {
            console.log(e)
        }
    }
}
