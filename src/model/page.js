import MdConvertor from '../utils/utils'
import tst from '../test.md'
import { BaseManager } from '../Manager/base'

export default {
    namespace: 'page',
    state: {
        html: '',
        headers: []
    },
    reducer: {
        mapHtml(state, { payload }) {
            const { html, headers } = payload
            return { ...state, html, headers }
        }
    },
    effects: {
        *fetchMarkdown({ put }, { payload }) {
            const instance = new MdConvertor()
            const convertor = instance.init()
            const d = new BaseManager()
            const md = yield d.Get('Dragact/_sidebar.md')
            const html = convertor.makeHtml(md)
            console.log(window.location.href)
            yield put({
                type: 'mapHtml',
                payload: {
                    html: html,
                    headers: instance.header
                }
            })
        }
    }
}
