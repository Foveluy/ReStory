const { chinese2pinyin } = require('./config/chinesepinyin')

const { resolve, join } = require('path')
const fs = require('fs-extra')

const isMarkdown = f => /\.md$/.test(f)
const naviObject = () => {}

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
        console.log(inside)
        console.log()
        return {
          route: chinese2pinyin(f),
          name: f,
          path: join(path, f),
          children: inside,
          type: 'dir'
        }
      }

      return {
        route: chinese2pinyin(f.replace('.md', '')),
        name: f.replace('.md', ''),
        path: resolve(join(path, f)),
        children: void 666,
        type: 'file'
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

  console.log(i)
}

scan('./docs')
