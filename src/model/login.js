import { UserManager } from '../Manager/user'
import { message } from 'antd'

export default {
    namespace: 'user',
    state: { isLogin: false },
    reducer: {
        login(state) {
            return {
                ...state,
                isLogin: true
            }
        },
        logout(state) {
            localStorage.removeItem('token')
            // location.href = '/'
            window.location.href = '/'
            return { ...state }
        }
    },
    effects: {
        *postLogin({ put, call }, { payload }) {
            const user = new UserManager(call)
            const res = yield user.userLogin(payload)
            console.log(res)
            if (res.Success) {
                localStorage.setItem('token', res.payload.token)
                yield put({
                    type: 'login'
                })
            } else {
                message.error(res.message)
            }
        }
    }
}
