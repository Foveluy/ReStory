import { message } from 'antd'
import { call } from 'redux-saga/effects'


export class BaseManager {
    constructor() {
        this.call = call
        this.user = '215566435'
        this.repo = 'TrumpDoc'

        this.domain =
            process.env.NODE_ENV === 'production'
                ? `https://${this.user}.github.io/${this.repo}/`
                : `https://${this.user}.github.io/${this.repo}/`
        this.token = localStorage.getItem('token')
    }

    loginFail(status) {
        if (status === 401) {
            message.error('登陆失效，请重新登陆')
            localStorage.removeItem('token')
            setTimeout(() => {
                window.location.href = '/login'
            }, 2000)
        }
    }

    *Get(url) {
        try {
            const res = yield this.call(fetch, this.domain + url, {
                method: 'GET'
            })
            this.loginFail(res.status)

            const buffer = yield res.arrayBuffer()
            const string = new TextDecoder('utf-8').decode(buffer)
            return string
        } catch (e) {
            console.log(e)
        }
    }
    *delete(url, body) {
        try {
            const res = yield this.call(fetch, this.domain + url, {
                method: 'DELETE',
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

    *fetchNoHeader(url, body) {
        try {
            const res = yield this.call(fetch, this.domain + url, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
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
