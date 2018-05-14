const { resolve, join } = require('path')
const fs = require('fs-extra')
const chalk = require('chalk').default

const { extractHeader } = require(resolve(__dirname, './r'))
const { getMarkdown } = require(resolve(__dirname, './r'))

const FormatCodeToString = obj => {
  const st = JSON.stringify(obj)
  return ['try{', `globals.Config = JSON.parse('${st}')`, '}catch(e){', 'console.warn(e)', '}'].join('\n')
}

const FormatCodeToGlobals = (key, obj) => {
  const st = JSON.stringify(obj)
  return ['try{', `globals.${key} = JSON.parse('${st}')`, '}catch(e){', 'console.warn(e)', '}'].join('\n')
}

const ImportMarkdown = (route, path) => {
  const newR = route.replace(' ', '')
  return [`\nimport ${newR} from '${path}';`, `globals.component["${newR}"] = ${newR};`].join('\n')
}

module.exports = function(source, map, meta) {
  const docsPath = resolve(process.argv[3])

  this.addContextDependency(docsPath)

  const navi = join(docsPath, 'navi')
  fs.ensureDirSync(navi)

  let selector = getMarkdown(docsPath)

  const originCode = FormatCodeToString({
    navi: selector
  })

  fs.ensureFileSync(join(docsPath, '.reactstory/config.js'))
  const _siteConfig = require(join(docsPath, '.reactstory/config.js'))
  const { title, repo, footer, github, gitpagePrefix } = _siteConfig
  const readmeName = _siteConfig.readmeName || 'README'

  const siteConfig = FormatCodeToGlobals('siteConfig', {
    title: title || 'ReStory',
    github: github === void 666 ? true : github,
    repo: repo || 'https://github.com/Foveluy/ReStory',
    footer: footer || 'ReStory ©2018 Created by ZhengFang',
    gitpagePrefix: gitpagePrefix || ''
  })

  const IndexJS = join(docsPath, 'index.js')
  let importIndexJS = ''
  if (fs.existsSync(IndexJS)) {
    importIndexJS = [`import IndexJSPage from '${IndexJS}'`, 'globals.IndexJSPage = IndexJSPage;'].join('\n')
  }

  let READMEConfig = ''
  if (fs.existsSync(join(docsPath, 'README.md'))) {
    READMEConfig = [
      `import README from '${join(docsPath, 'README.md')}';\n`,
      `globals.README = {
      route:'README',
      name:'${readmeName}',
      path:void 666,
      children:void 666,
      type:'file',
      component:README,
      header:JSON.parse('${JSON.stringify(extractHeader(join(docsPath, 'README.md')))}')
    };`
    ].join('\n')
  }

  let imString = ['globals.component = {};', READMEConfig, 'globals.level = 2;', importIndexJS, siteConfig].join('\n')

  selector.forEach(i => {
    if (i.type === 'file') {
      imString += ImportMarkdown(i.route, i.path)
    }
    if (i.type === 'dir') {
      i.children.forEach(child => {
        if (child.type === 'file') imString += ImportMarkdown(i.route + '_' + child.route, child.path)
        // todo: more nested
      })
    }
  })

  this.callback(null, source + ';\n' + originCode + ';\n' + imString, map, meta)
  return // always return undefined when calling callback()
}
