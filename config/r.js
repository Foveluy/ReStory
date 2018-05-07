const { chinese2pinyin } = require('./chinesepinyin')

const { resolve, join } = require('path')
const fs = require('fs-extra')
chinese2pinyin

const select = (filename, navi) => {
  if (filename instanceof Array) {
    filename = filename.map(f => {
      return f.replace('.md', '')
    })
  }

  let naviPath = navi
  if (/[\u4e00-\u9fa5]/.test(navi)) {
    naviPath = chinese2pinyin(navi.replace('.md', ''))
  }

  return {
    filename: filename,
    navi: navi.replace('.md', ''),
    naviPath: naviPath.replace('.md', '')
  }
}

const isMarkdown = f => /\.md$/.test(f)

const getMarkdown = navi => {
  const md = fs.readdirSync(navi)
  let selector = md
    .filter(f => {
      if (fs.statSync(resolve(navi, f)).isDirectory()) {
        // if is a dir
        return f
      }
      if (isMarkdown(f)) return f
    })
    .map(f => {
      const isDir = fs.statSync(resolve(navi, f)).isDirectory()
      if (isDir) {
        const mdInside = fs.readdirSync(resolve(navi, f))
        const makeup = mdInside.map((file, index) => {
          if (isMarkdown(file)) return file
        })
        return select(makeup, f)
      }
      return isMarkdown(f) ? select(f, f) : void 666
    })

  // console.log(selector)
  return selector
}

// getMarkdown(resolve('./docs/navi'))

exports.getMarkdown = getMarkdown
