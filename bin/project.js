const fs = require('fs-extra')
// Ensure environment variables are read.
require('../config/env')

const chalk = require('chalk')
const { resolve } = require('path')
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

    fs.copy(resolve(__dirname, '../build'), join(this.bootPath, 'build'))
    fs.copy(resolve(__dirname, '../serverbuild'), join(this.bootPath, 'serverbuild'))
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

  deploy() {}

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
