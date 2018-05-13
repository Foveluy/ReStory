const { resolve, join } = require('path')
const { chinese2pinyin } = require(resolve(__dirname, './chinesepinyin'))

const fs = require('fs-extra')

const isMarkdown = f => /\.md$/.test(f)

function extractHeader(src) {
  var i = fs.readFileSync(src, 'utf-8')

  let extract = []
  let currentH1 = 0

  while (1) {
    let out = i.match(/^(\#{1,6})([^\#\n]+)$/m)

    if (out === null) break
    const level = out[1].length
    if (level === 1) {
      extract.push(out[2].substring(1))
      currentH1 = extract.length - 1
      extract[currentH1] = [extract[currentH1], []]
    } else if (level === 2) {
      if (!extract[currentH1]) {
        extract[currentH1] = ['no-h1', []]
        currentH1 = extract.length - 1
      }
      extract[currentH1][1].push(out[2].substring(1))
    }

    // console.log(out[2])
    // console.log(out[0])

    i = out.input.replace(out[0], '<shit>')
  }
  return extract
}

const modulesMaker = (path, files) => {
  let i = files
    .filter(f => {
      if (isMarkdown(f)) return f // markdown
      if (fs.statSync(join(path, f)).isDirectory()) return f //isDirectory
    })
    .map(f => {
      if (fs.statSync(join(path, f)).isDirectory()) {
        const dirfiles = fs.readdirSync(join(path, f))
        let inside = modulesMaker(join(path, f), dirfiles)
        let removedf = f.replace(/^\d+./, '')
        return {
          route: chinese2pinyin(removedf),
          name: removedf,
          path: join(path, f),
          children: inside,
          type: 'dir',
          header: dirfiles
        }
      }

      let removedf = f.replace(/^\d+./, '').replace('.md', '')
      return {
        route: chinese2pinyin(removedf),
        name: removedf,
        path: resolve(join(path, f)),
        children: void 666,
        type: 'file',
        header: extractHeader(resolve(join(path, f)))
      }
    })
  return i
}

const scan = src => {
  const naviPath = join(src, 'navi')
  const files = fs.readdirSync(resolve(naviPath))

  let i = modulesMaker(naviPath, files)

  // * 1.文件(夹)名
  // * 2.文件路径
  // * 3.chilren:[]|void 666
  // * 4.type:file|dir

  return i
}

exports.getMarkdown = scan
exports.extractHeader = extractHeader
