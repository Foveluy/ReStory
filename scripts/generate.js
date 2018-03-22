const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const pkg = require('../package.json')

console.log('读取模版文件...')
const str = fs.readFileSync(path.resolve('scripts/index.ejs'), 'utf8') //先读文件

console.log('当前版本号:', pkg.version)

const currentV = pkg.version.split('.')
const nextLastV = parseInt(currentV[2]) + 1 + ''
const nextV = `${currentV[0]}.${currentV[1]}.${nextLastV}`

console.log('下一个版本号:', nextV)
const jscdn = `//unpkg.com/trumpdoc@${nextV}/trumpdoc.js`
const codeCss = 'https://cdn.jsdelivr.net/npm/prismjs@1.13.0/themes/prism-okaidia.css'
var html = ejs.render(str, {
    js: jscdn,
    css: codeCss,
    trumpDocCss:`//unpkg.com/trumpdoc@${nextV}/trumpdoc.css`
})

console.log('cdn js生成版本:', jscdn)
console.log('cdn css生成版本:', trumpDocCss)
console.log('code block css style:', codeCss)

const nextPkg = { ...pkg, version: nextV }

fs.writeFileSync(path.resolve('docs/index.html'), html, 'utf-8')
fs.writeFileSync(
    path.resolve('package.json'),
    JSON.stringify(nextPkg, null, 4),
    'utf-8'
)
