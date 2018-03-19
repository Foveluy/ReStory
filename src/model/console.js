import { ArticleManager } from "../Manager/article";

export default {
    namespace: 'console',
    state: {},
    reducer: {
        redirect(state, { payload }) {

            return {
                ...state,
                redirectPath: { pathname: payload.redirectPath },
                isRedirect: payload.isRedirect
            }
        }
    },
    effects: {
        *deleteArticle({ put, call }, { payload }) {
            const amanager = new ArticleManager(call);
            const res = yield amanager.deleteArticle({
                articleID: payload
            })
            try {
                yield put({
                    type: 'articleList',
                    payload: res.data
                })
            } catch (e) {
                console.log(e)
            }
        }
    }
}