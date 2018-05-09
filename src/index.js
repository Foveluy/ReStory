import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import App from './router'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'

ReactDOM.hydrate(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)

registerServiceWorker()
