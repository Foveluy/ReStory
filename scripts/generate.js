const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const pkg = require('../package.json')
const readline = require('readline')

console.log('读取模版文件...')
const str = fs.readFileSync(path.resolve('scripts/index.ejs'), 'utf8') //先读文件

console.log('当前版本号:', pkg.version)

const currentV = pkg.version.split('.')
const nextLastV = parseInt(currentV[2]) + 1 + ''
const nextV = `${currentV[0]}.${currentV[1]}.${nextLastV}`

console.log('下一个版本号:', nextV)
const jscdn = `//unpkg.com/trumpdoc@${nextV}/trumpdoc.js`
const codeCss =
    'https://cdn.jsdelivr.net/npm/prismjs@1.13.0/themes/prism-okaidia.css'
const trumpDocCss = `//unpkg.com/trumpdoc@${nextV}/trumpdoc.css`
var html = ejs.render(str, {
    js: jscdn,
    css: codeCss,
    trumpDocCss: trumpDocCss
})

console.log('cdn js生成版本:', jscdn)
console.log('cdn css生成版本:', trumpDocCss)
console.log('code block css style:', codeCss)

const nextPkg = { ...pkg, version: nextV }

//创建readline接口实例
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// question方法
rl.question('是否要发布？(y/N)', function(answer) {
    if (answer === 'y') {
        fs.writeFileSync(path.resolve('docs/index.html'), html, 'utf-8')
        fs.writeFileSync(
            path.resolve('package.json'),
            JSON.stringify(nextPkg, null, 4),
            'utf-8'
        )
    }

    console.log('取消发布')
    rl.close()
})

// close事件监听
rl.on('close', function() {
    // 结束程序
    process.exit(0)
})
