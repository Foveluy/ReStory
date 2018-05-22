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

var uri = ''
var h = ''

const universalLoader = (req, res) => {
  // Load in our HTML file from our build

  // if there is static file

  if (/(\.css|\.css\.map)$/.test(req.path)) {
    res.send('')
    res.status(200).end()
    return
  }

  if (/main/.test(req.path)) {
    res.send(config.mainJsClient)
    res.status(200).end()
    return
  }
  if (/vendor/.test(req.path)) {
    res.send(config.vendorJSClient)
    res.status(200).end()
    return
  }

  // Create a store and sense of history based on the current path
  const history = {}

  // render the html
  const routeMarkup = config.R({ context: history, location: req.path })

  // // Let Helmet know to insert the right tags
  const helmet = Helmet.renderStatic()

  // // Form the final HTML response
  const html = prepHTML(config.htmlText, {
    html: helmet.htmlAttributes.toString(),
    head: helmet.title.toString() + helmet.meta.toString() + helmet.link.toString(),
    body: routeMarkup,
    css: config.mainCssClient
  })
  // Up, up, and away...
  res.send(html)
}

export default universalLoader
