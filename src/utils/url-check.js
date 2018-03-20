export function isURL(str) {
    return !!str.match(/(http[s]?|ftp):\/\/[^\/\.]+?\..+\w$/g) // eslint-disable-line
}

export const SiderParser = str => {
    const obj = str.match(/!?\[([^\]<>]+)\]\(([^ \)<>]+)( "[^\(\)\"]+")?\)/g) // eslint-disable-line
    if (obj) {
        return obj.map(link => {
            console.log(link)
            const title = /\[(.*?)\]/g.exec(link)[1] // eslint-disable-line
            const url = /\((.*?)\)/g.exec(link)[1] // eslint-disable-line
            const isWebUrl = isURL(url)
            return {
                title,
                url,
                isWebUrl
            }
        })
    }
    throw new Error('没有文档，赶快创建吧！')
}
