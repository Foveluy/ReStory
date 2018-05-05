const { resolve, join } = require('path')
const fs = require('fs-extra')

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

let imString = ''
selector.forEach(i => {
  imString += `import ${i.navi} from '${resolve(i.filename)}';\n`
})

console.log(imString)
