import { message } from 'antd'

export class BaseManager {
    constructor(call) {
        this.call = call
        this.domain =
            process.env.NODE_ENV === 'production'
                ? 'http://www.foveluy.com/api'
                : 'http://192.168.1.73:7001/api'
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
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + this.token
                }
            })
            this.loginFail(res.status)

            const json = yield res.json()
            return json
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
