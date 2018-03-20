import MdConvertor from '../utils/utils'
import { BaseManager } from '../Manager/base'

const SiderParser = str => {
    const obj = str.match(/!?\[([^\]<>]+)\]\(([^ \)<>]+)( "[^\(\)\"]+")?\)/g) //match url
    if (obj) {
        return obj.map(link => {
            console.log(link)
            const title = /\[(.*?)\]/g.exec(link)[1]
            const url = /\((.*?)\)/g.exec(link)[1]
            return {
                title,
                url
            }
        })
    }
    throw new Error('没有文档，赶快创建吧！')
}

export default {
    namespace: 'page',
    state: {
        rawTexts: '',
        docList: []
    },
    reducer: {
        mapHtml(state, { payload }) {
            return { ...state, html: payload }
        },
        mapDocList(state, { payload }) {
            return { ...state, docList: payload }
        }
    },

    effects: {
        *fetchMenu({ put, select }, { payload }) {
            if (payload === false) {
                const pageState = yield select(state => state.page)
                yield put({
                    type: 'mapHtml',
                    payload: {
                        html: pageState.html,
                        headers: [...pageState.headers]
                    }
                })
            }
        },
        *fetchDocList({ put, call, fork }, { payload }) {
            const d = new BaseManager()
            const md = yield d.Get('Dragact/_sidebar.md')
            const docList = SiderParser(md)

            const rawTexts = yield docList.map(item => {
                return d.Get(`Dragact/${item.url}`)
            })

            const newDocList = docList.map((item, index) => {
                const instance = new MdConvertor()
                const convertor = instance.init()
                const md = convertor.makeHtml(rawTexts[index])

                return { ...item, mdText: md, headers: instance.header }
            })

            yield put({
                type: 'mapDocList',
                payload: newDocList
            })
        },
        *renderDocs({ put, call, select }, { payload }) {
            const docList = yield select(state => state.page.docList)
            const item = docList.find(item => item.title === payload)
            console.log(item)
            yield put({
                type: 'mapHtml',
                payload: item.mdText
            })
        }
    }
}

// const regexobject: {
//   headline: /^(\#{1,6})([^\#\n]+)$/m,
//   code: /\s\`\`\`\n?([^`]+)\`\`\`/g,
//   hr: /^(?:([\*\-_] ?)+)\1\1$/gm,
//   lists: /^((\s*((\*|\-)|\d(\.|\))) [^\n]+)\n)+/gm,
//   bolditalic: /(?:([\*_~]{1,3}))([^\*_~\n]+[^\*_~\s])\1/g,
//   links: /!?\[([^\]<>]+)\]\(([^ \)<>]+)( "[^\(\)\"]+")?\)/g,
//   reflinks: /\[([^\]]+)\]\[([^\]]+)\]/g,
//   smlinks: /\@([a-z0-9]{3,})\@(t|gh|fb|gp|adn)/gi,
//   mail: /<(([a-z0-9_\-\.])+\@([a-z0-9_\-\.])+\.([a-z]{2,7}))>/gmi,
//   tables: /\n(([^|\n]+ *\| *)+([^|\n]+\n))((:?\-+:?\|)+(:?\-+:?)*\n)((([^|\n]+ *\| *)+([^|\n]+)\n)+)/g,
//   include: /[\[<]include (\S+) from (https?:\/\/[a-z0-9\.\-]+\.[a-z]{2,9}[a-z0-9\.\-\?\&\/]+)[\]>]/gi,
//   url: /<([a-zA-Z0-9@:%_\+.~#?&\/=]{2,256}\.[a-z]{2,4}\b(\/[\-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)?)>/g
// }
