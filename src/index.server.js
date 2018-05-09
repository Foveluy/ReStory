import React from 'react'
import ReactDOM from 'react-dom'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './router'
import "./index.css"

export const R = ({ context, location }) => {
  return renderToString(
    <StaticRouter context={context} location={location}>
      <App />
    </StaticRouter>
  )
}
