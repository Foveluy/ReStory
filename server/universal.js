import path from 'path'
import fs from 'fs'
import React from 'react'
import Helmet from 'react-helmet'
const config = require('./config')

// A simple helper function to prepare the HTML markup
const prepHTML = (data, { html, head, body, css }) => {
  data = data.replace('<html lang="en">', `<html ${html}`)
  data = data.replace('</head>', `${head}</head>`)
  data = data + `<style>${css}</style>`
  data = data.replace('<div id="root"></div>', `<div id="root">${body}</div>`)

  return data
}

const universalLoader = (req, res) => {
  // Load in our HTML file from our build
  const filePath = path.resolve(__dirname, '../docs/serverbuild/index.html')

  // if there is static file

  if (/(\.css|\.css\.map)$/.test(req.path)) {
    res.send('')
    res.status(200).end()
    return
  }

  if (/\.js$/.test(req.path)) {
    res.send(config.mainJsClient)
    res.status(200).end()
    return
  }

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    // If there's an error... serve up something nasty
    if (err) {
      console.error('Read error', err)

      return res.status(404).end()
    }

    // Create a store and sense of history based on the current path
    const history = {}

    // render the html
    const routeMarkup = config.R({ context: history, location: req.path })

    // // Let Helmet know to insert the right tags
    const helmet = Helmet.renderStatic()

    // // Form the final HTML response
    const html = prepHTML(htmlData, {
      html: helmet.htmlAttributes.toString(),
      head: helmet.title.toString() + helmet.meta.toString() + helmet.link.toString(),
      body: routeMarkup,
      css: config.mainCssClient
    })
    // Up, up, and away...
    res.send(html)
  })
}

export default universalLoader
