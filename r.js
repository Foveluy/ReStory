// const { chinese2pinyin } = require('./config/chinesepinyin')

// const { resolve, join } = require('path')
const fs = require('fs-extra')

// const isMarkdown = f => /\.md$/.test(f)
// const naviObject = () => {}

// const modulesMaker = (path, files) => {
//   let i = files
//     .filter(f => {
//       if (isMarkdown(f)) return f // markdown
//       if (fs.statSync(join(path, f)).isDirectory()) return f //isDirectory
//     })
//     .map(f => {
//       if (fs.statSync(join(path, f)).isDirectory()) {
//         const dirfiles = fs.readdirSync(join(path, f))
//         let inside = modulesMaker(join(path, f), dirfiles)
//         console.log(inside)
//         console.log()
//         return {
//           route: chinese2pinyin(f),
//           name: f,
//           path: join(path, f),
//           children: inside,
//           type: 'dir'
//         }
//       }

//       return {
//         route: chinese2pinyin(f.replace('.md', '')),
//         name: f.replace('.md', ''),
//         path: resolve(join(path, f)),
//         children: void 666,
//         type: 'file'
//       }
//     })
//   return i
// }

// const scan = src => {
//   const naviPath = join(src, 'navi')
//   const files = fs.readdirSync(resolve(naviPath))

//   let i = modulesMaker(naviPath, files)

//   // * 1.文件(夹)名
//   // * 2.文件路径
//   // * 3.chilren:[]|void 666
//   // * 4.type:file|dir

//   console.log(i)
// }

// scan('./docs')

function extractHeader(src) {
  var i = fs.readFileSync(src, 'utf-8')

  let extract = {}
  let currentH1 = ''

  while (1) {
    let out = i.match(/^(\#{1,6})([^\#\n]+)$/m)

    if (out === null) break
    const level = out[1].length
    if (level === 1) {
      currentH1 = out[2].substring(1)
      extract[currentH1] = []
    } else if (level === 2) {
      if (!extract[currentH1]) {
        extract['no-h1'] = []
        currentH1 = 'no-h1'
      }
      extract[currentH1].push(out[2].substring(1))
    }

    // console.log(out[2])
    // console.log(out[0])

    i = out.input.replace(out[0], '<shit>')
  }
  return extract
}

console.log(extractHeader('./README.md'))
