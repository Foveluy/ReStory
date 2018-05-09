// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

// Ignore those pesky styles
require('ignore-styles')

// Set up babel to do its thing... env for the latest toys, react-app for CRA
require('babel-register')({
  ignore: /\/(build|node_modules)\//,
  presets: ['env', 'react-app'],
  compact: false
})


require('css-modules-require-hook')({
    extensions: ['.scss'],
    preprocessCss: (data, filename) =>
        require('node-sass').renderSync({
            data,
            file: filename
        }).css,
    camelCase: true,
    generateScopedName: '[name]__[local]__[hash:base64:8]'
})


// Now that the nonsense is over... load up the server entry point
require('./server')
