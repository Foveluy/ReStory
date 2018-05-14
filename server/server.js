import express from 'express'
import path from 'path'

import universalLoader from './universal'

// Create our express app (using the port optionally specified)
const app = express()
const PORT = process.env.PORT || 3000

// Set up route handling, include static assets and an optional API

app.use('/', universalLoader)

// Let's rock
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`)
})

// Handle the bugs somehow
app.on('error', error => {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
})
