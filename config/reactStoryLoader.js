const { resolve, join } = require('path')
const fs = require('fs-extra')

const FormatCodeToString = obj => {
  const st = JSON.stringify(obj)
  return `window.Config = JSON.parse('${st}')`
}

module.exports = function(source, map, meta) {
  const docsPath = resolve(process.argv[2])
  const navi = join(docsPath, 'navi')

  const md = fs.readdirSync(navi)

  let selector = md
    .filter(f => {
      if (/\.md$/.test(f)) {
        return f
      }
    })
    .map(f => {
      return {
        filename: f,
        navi: f.replace('.md', '')
      }
    })

  const originCode = FormatCodeToString({
    navi: selector.map(f => f.navi)
  })
  let imString = 'window.level = 2;'
  selector.forEach(i => {
    imString += `import ${i.navi} from '${resolve(navi, i.filename)}';\n`
  })

  imString += 'window.component ={};\n'
  selector.forEach(i => {
    imString += `window.component["${i.navi}"]=${i.navi};\n`
  })

  this.callback(null, originCode + ';\n' + imString + source, map, meta)
  return // always return undefined when calling callback()
}
