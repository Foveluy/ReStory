const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')

const { resolve } = require('path')

const compiler = webpack(config)

compiler.hooks.invalid.tap('invalid', () => {
  console.log('编译中...')
})

compiler.hooks.done.tap('done', () => {
  console.log('编译完成')
})

const server = new webpackDevServer(compiler, {
  compress: true,
  host: '127.0.0.1',
  hot: true,
  quiet: true,
  contentBase: resolve('./public'),
  watchOptions: {
    poll: true
  }
})

server.listen(3001, () => {
  console.log('opened')
})
