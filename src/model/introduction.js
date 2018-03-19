export default {
    namespace: 'intro',
    state: {},
    reducer: {
        articleList(state, { payload }) {

            return { ...state, articleList: payload.rows, count: payload.count }
        }
    },
    effects: {
        *fetchArticle({ put, call }, { payload }) {
          
        }
    }
}