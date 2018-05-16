const { resolve, join } = require('path')
const fs = require('fs-extra')
const chalk = require('chalk').default

const { extractHeader } = require(resolve(__dirname, './r'))
const { getMarkdown } = require(resolve(__dirname, './r'))

const FormatCodeToGlobals = (key, obj) => {
  const st = JSON.stringify(obj)
  return ['try{', `globals.${key} = JSON.parse('${st}')`, '}catch(e){', 'console.warn(e)', '}'].join('\n')
}

const Import = (importName, src) => {
  return `\nimport ${importName} from '${src}';\n`
}

const ImportMarkdown = (route, path) => {
  const newR = route.replace(' ', '')
  return [Import(newR, path), `globals.component["${newR}"] = ${newR};`].join('\n')
}

module.exports = function(source, map, meta) {
  const docsPath = resolve(process.argv[3])

  this.addContextDependency(docsPath)

  const navi = join(docsPath, 'navi')
  fs.ensureDirSync(navi)

  let selector = getMarkdown(docsPath)

  const originCode = FormatCodeToGlobals('Config', {
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
    gitpagePrefix: gitpagePrefix || '/non-sence-crap'
  })

  const IndexJS = join(docsPath, 'index.js')
  let importIndexJS = ''
  if (fs.existsSync(IndexJS)) {
    importIndexJS = [Import('IndexJSPage', IndexJS), 'globals.IndexJSPage = IndexJSPage;'].join('\n')
  }

  let READMEConfig = ''
  const READMEPath = join(docsPath, 'README.md')
  if (fs.existsSync(READMEPath)) {
    READMEConfig = [
      Import('README', READMEPath),
      `globals.README = {
      route:'README',
      name:'${readmeName}',
      path:void 666,
      children:void 666,
      type:'file',
      component:README,
      header:JSON.parse('${JSON.stringify(extractHeader(READMEPath))}')
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
