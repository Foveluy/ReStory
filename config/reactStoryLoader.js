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

  const md = fs.readdirSync(navi)

  let selector = md
    .filter(f => {
      if (fs.statSync(resolve(navi, f)).isDirectory()) {
        // if is a dir
        return f
      }

      if (/\.md$/.test(f)) {
        //if is a .md file
        return f
      }
    })
    .map(f => {
      if (fs.statSync(resolve(navi, f)).isDirectory()) {
        const mdInside = fs.readdirSync(resolve(navi, f))
        console.log('mdInside-->', mdInside)
        return mdInside.map(f => {
          if (/\.md$/.test(f)) {
            //if is a .md file
            return f
          }
        })
      } else {
        return {
          filename: f,
          navi: f.replace('.md', '')
        }
      }
    })

  console.log(selector)
  //
  const originCode = FormatCodeToString({
    navi: selector.map(f => f.navi)
  })

  let imString = 'window.level = 2;\n'

  // first step is getting the README.md
  imString += `import README from '${join(docsPath, 'README.md')}';\n`

  selector.forEach(i => {
    imString += `import ${i.navi} from '${resolve(navi, i.filename)}';\n`
  })

  imString += 'window.component ={};\n'
  // setup README
  imString += `window.README = README;\n`
  selector.forEach(i => {
    imString += `window.component["${i.navi}"]=${i.navi};\n`
  })

  this.callback(null, originCode + ';\n' + imString + source, map, meta)
  return // always return undefined when calling callback()
}
