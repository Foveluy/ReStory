#!/usr/bin/env node

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production'
process.env.NODE_ENV = 'production'

const ReactStoryInit = require('./project')
new ReactStoryInit(process.cwd(), process.argv.slice(2)).run()
