const { getMarkdown } = require('./r')
const { resolve, join } = require('path')
const fs = require('fs-extra')
const chalk = require('chalk').default

const FormatCodeToString = obj => {
  const st = JSON.stringify(obj)
  return `window.Config = JSON.parse('${st}')`
}

module.exports = function(source, map, meta) {
  const docsPath = resolve(process.argv[2])

  this.addContextDependency(docsPath)

  const navi = join(docsPath, 'navi')

  let selector = getMarkdown(navi)

  const originCode = FormatCodeToString({
    navi: selector.map(f => {
      if (f.filename instanceof Array) {
        // { filename: [ 'check.md' ], navi: 'guide' }
        // we convert this to
        // ['guide',[ 'check.md' ]]
        return {
          showName: [f.navi, f.filename],
          path: f.naviPath
        }
      }
      return {
        showName: f.navi,
        path: f.naviPath
      }
    })
  })

  let imString = [
    'window.component = {};',
    `window.README = README;`,
    'window.level = 2;',
    ' // first step is getting the README.md',
    `import README from '${join(docsPath, 'README.md')}';\n`
  ].join('\n')

  selector.forEach(i => {
    if (i.filename instanceof Array) {
      i.filename.forEach(f => {
        imString += `import ${f} from '${resolve(navi + '/' + i.navi, `${f}.md`)}';\n`
        imString += `window.component["${i.naviPath + '/' + f}"] = ${f};\n`
      })
    } else {
      imString += `import ${i.navi} from '${resolve(navi, i.filename)}';\n`
      imString += `window.component["${i.naviPath}"] = ${i.navi};\n`
    }
  })

  console.log(imString)
  console.log(originCode)

  this.callback(null, originCode + ';\n' + imString + source, map, meta)
  return // always return undefined when calling callback()
}
