export default {
  namespace: 'page',
  state: {},
  reducer: {
    finishedConvert(state, { payload }) {
      return { ...state, html: payload }
    }
  },
  effects: {}
}
