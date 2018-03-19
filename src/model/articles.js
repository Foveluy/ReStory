export default {
    namespace: 'articles',
    state: {},
    reducer: {
        bindArticle(state, { payload }) {
            return { ...state, ...payload }
        },
        bindComments(state, { payload }) {
            return { ...state, CommentList: payload }
        },
        ClearComment(state) {
            return { ...state, CommentList: undefined }
        }
    },
    effects: {}
}
