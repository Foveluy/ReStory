const fs = require('fs-extra')
// Ensure environment variables are read.
const path = require('path')
// Ensure environment variables are read.
require(path.resolve(__dirname, '../config/env'))

const chalk = require('chalk')
const { resolve, join } = require('path')
const child_process = require('child_process')

class ReactStoryInit {
  constructor(props, args) {
    args[0] = args[0] || 'dev'
    args[1] = args[1] || '.'
    if (!this.modes[args[0]]) {
      console.log(
        chalk.default.redBright(
          [
            '\nReactStory-cli only support',
            'dev: for development',
            'build: for building site',
            'deploy: run a server to serve your site'
          ].join('\n')
        )
      )
      process.exit(1)
    }

    this.bootPath = props
    this.mode = args[0]
    this.targetPath = args[1]

    // console.log(args)
  }

  dev() {
    const devrun = require('./dev')
    devrun()
  }

  finished() {
    console.log('全部完成了')

    if (fs.existsSync(join(this.bootPath, 'server'))) {
      fs.removeSync(fs.existsSync(join(this.bootPath, 'server')))
    }
    fs.ensureDirSync(join(this.bootPath, 'server'))
    fs.copy(resolve(__dirname, '../server'), join(this.bootPath, 'server'))
  }

  build() {
    let i = 0
    const building = require('./build')
    const buildingProject = require('./client')
    building(type => {
      i++
      if (i == 2) this.finished()
    })
    buildingProject(() => {
      i++
      if (i == 2) this.finished()
    })
  }

  deploy() {
    const manifestJson = require('../build/asset-manifest.json')
    const jsName = manifestJson['main.js'].replace('static/js/', '')
    const cssName = manifestJson['main.css'].replace('static/css/', '')

    fs.ensureFileSync(resolve(__dirname, `../docs/${jsName}`))
    fs.ensureFileSync(resolve(__dirname, `../docs/${cssName}`))
    fs.copyFileSync(resolve(__dirname, `../build/${manifestJson['main.js']}`), resolve(__dirname, `../docs/${jsName}`))
    fs.copyFileSync(
      resolve(__dirname, `../build/${manifestJson['main.css']}`),
      resolve(__dirname, `../docs/${cssName}`)
    )

    const html = [
      '<!DOCTYPE html>',
      '<html lang="en">',
      '<head>',
      '<meta charset="utf-8">',
      '<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;" name="viewport" />',
      '  <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.14.0/themes/prism-tomorrow.min.css" rel="stylesheet">',
      '  <meta name="theme-color" content="#000000">',
      ' <title>ReactStory</title>',
      `<link href="${cssName}" rel="stylesheet">`,
      '</head><body><div id="root"></div></body>',
      '</html>',
      `<script type="text/javascript" src="${jsName}" ></script>`
    ].join(' ')

    fs.ensureFileSync(resolve(__dirname, '../docs/index.html'))
    fs.writeFileSync(resolve(__dirname, '../docs/index.html'), html)
  }

  run() {
    this[this.mode]()
  }
}
ReactStoryInit.prototype.modes = {
  dev: 1,
  build: 1,
  deploy: 1
}

module.exports = ReactStoryInit
