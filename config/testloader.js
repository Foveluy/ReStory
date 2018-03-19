const path = require('path')
const fs = require('fs')

module.exports = function(source) {
    this.cacheable(false)

    const appPath = path.resolve('src/model')
    const src = fs.readdirSync(appPath).reduce((pre, next, index) => {
        if (index === 1) {
            return (
                `rluy.model(require('./model/${pre.split('.')[0]}'));\n` +
                `rluy.model(require('./model/${next.split('.')[0]}'));\n`
            )
        }
        return pre + `rluy.model(require('./model/${next.split('.')[0]}'));\n`
    })
    this.addContextDependency(appPath)
    console.log('adding module...')
    return `${source}\n${src}\nexport const Rluy = rluy`
}
