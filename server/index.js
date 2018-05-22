// Do this as the first thing so that any code reading it knows the right env.

const signal = require('signale')

process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

signal.success('Starting Simple server ')
// Set up babel to do its thing... env for the latest toys, react-app for CRA
require('babel-register')({
  ignore: /\/(build|node_modules)\//,
  presets: ['env', 'react-app'],
  compact: false
})

// Now that the nonsense is over... load up the server entry point
require('./server')
