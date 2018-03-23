import { BaseManager } from './base'
import { SiderParser } from '../utils/url-check'

export class MarkdownManager extends BaseManager {
    *getMardownList() {
        if (this.isDev()) return yield this.listDev()

        return yield this.listGithub()
    }

    *listDev() {

        return yield this.listGithub()
    }

    *listGithub() {
        //contain a markdown list
        const listMarkdown = yield this.Get('leftSider.md')

        console.log(listMarkdown)
        /**parse mark down list
         * [x](xxx)
         * [x](xxx)
         */
        const docList = SiderParser(listMarkdown)

        

        //fetch content of list
        const rawTexts = yield docList.map(item => {
            if (item.isWebUrl) {
                //我们必须在这里判断是否是网址
                return item.url
            }
            return this.Get(`${item.url}`)
        })

        //we get the file name of every markdown file
        const newlist = rawTexts.map((rawMarkdown, index) => {
            return {
                rawMarkdown,
                title: docList[index].title,
                isWebUrl: docList[index].isWebUrl
            }
        })

        return newlist
    }
}
