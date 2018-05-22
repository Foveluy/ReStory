const { resolve, join } = require('path')
const { chinese2pinyin } = require(resolve(__dirname, './chinesepinyin'))
const { extractHeader } = require(resolve(__dirname, './extractHeader'))

const fs = require('fs-extra')

const isMarkdown = f => /\.md$/.test(f)

/**
 *
 * @param {string} path
 * @param {Array<string>} files
 */
const modulesMaker = (path, files) => {
  let i = files
    .filter(f => {
      if (fs.statSync(join(path, f)).isDirectory() || isMarkdown(f)) return f //isDirectory
    })
    .map(f => {
      if (fs.statSync(join(path, f)).isDirectory()) {
        const dirfiles = fs.readdirSync(join(path, f))
        let inside = modulesMaker(join(path, f), dirfiles)
        let removedf = f.replace(/^\d+./, '')
        return {
          route: chinese2pinyin(removedf).replace(' ', ''),
          name: removedf,
          path: join(path, f),
          children: inside,
          type: 'dir',
          header: dirfiles
        }
      }

      let removedf = f.replace(/^\d+./, '').replace('.md', '')
      return {
        route: chinese2pinyin(removedf).replace(' ', ''),
        name: removedf,
        path: resolve(join(path, f)),
        children: void 666,
        type: 'file',
        header: extractHeader(resolve(join(path, f)))
      }
    })
  return i
}

/**
 * we scan navi path
 * get every .md path to load to restory
 * @param {string} src
 */
const scan = src => {
  const naviPath = join(src, 'navi')
  const files = fs.readdirSync(resolve(naviPath))

  let i = modulesMaker(naviPath, files)
  return i
}

exports.getMarkdown = scan
