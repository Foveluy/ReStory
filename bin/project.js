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

  run() {
    const scriptpath = {
      dev: '../scripts/start',
      build: '../scripts/build',
      deploy: ''
    }

    const scripts = resolve(__dirname, scriptpath[this.mode])

    let pid = 0
    try {
      const prs = child_process.exec(`node ${scripts} ${this.targetPath} --colors`)
      pid = prs.pid
      process.stdin.pipe(prs.stdin)
      prs.stdout.pipe(process.stdout)
      prs.stderr.pipe(process.stdout)
    } catch (e) {
      if (pid !== 0) process.kill(pid)
      console.log(chalk.default.redBright(e))
      process.exit(1)
    }
  }
}
ReactStoryInit.prototype.modes = {
  dev: 1,
  build: 1,
  deploy: 1
}

new ReactStoryInit(process.cwd(), process.argv.slice(2)).run()
