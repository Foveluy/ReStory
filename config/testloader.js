const path = require('path')
const fs = require('fs')

module.exports = function(source) {
  this.cacheable(false)

  const appPath = path.resolve('src/model')
  const src = fs.readdirSync(appPath)

  var res = src.reduce((pre, next, index) => {
    if (index === 1) {
      return (
        `rluy.model(require('./model/${pre.split('.')[0]}'));\n` +
        `rluy.model(require('./model/${next.split('.')[0]}'));\n`
      )
    }
    return pre + `rluy.model(require('./model/${next.split('.')[0]}'));\n`
  })

  res =
    src.length === 1
      ? `rluy.model(require('./model/${src[0].split('.')[0]}'));\n`
      : res

  
  this.addContextDependency(appPath)
  console.log('adding module...')
  return `${source}\n${res}\nexport const Rluy = rluy`
}
