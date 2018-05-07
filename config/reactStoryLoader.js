const { getMarkdown } = require('./r')
const { resolve, join } = require('path')
const fs = require('fs-extra')
const chalk = require('chalk').default

const FormatCodeToString = obj => {
  const st = JSON.stringify(obj)
  return `window.Config = JSON.parse('${st}')`
}

const ImportMarkdown = (route, path) => {
  return [
    `\nimport ${route} from '${path}';`,
    `window.component["${route}"] = ${route};`
  ].join('\n')
}

module.exports = function(source, map, meta) {
  const docsPath = resolve(process.argv[2])

  this.addContextDependency(docsPath)

  const navi = join(docsPath, 'navi')

  let selector = getMarkdown(docsPath)

  const originCode = FormatCodeToString({
    navi: selector
  })

  let imString = [
    'window.component = {};',
    `window.README = README;`,
    'window.level = 2;',
    ' // first step is getting the README.md',
    `import README from '${join(docsPath, 'README.md')}';\n`
  ].join('\n')

  // * 1.文件(夹)名
  // * 2.文件路径
  // * 3.chilren:[]|void 666
  // * 4.type:file|dir

  selector.forEach(i => {
    if (i.type === 'file') {
      imString += ImportMarkdown(i.route, i.path)
    }
    if (i.type === 'dir') {

      i.children.forEach(child => {
        if (child.type === 'file') imString += ImportMarkdown(i.route + '_' + child.route, child.path)
        // todo: more nested
      })
    }
  })

  console.log(imString)
  console.log(originCode)

  this.callback(null, originCode + ';\n' + imString + source, map, meta)
  return // always return undefined when calling callback()
}
