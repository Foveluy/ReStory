import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import App from './router'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
// import { hot } from 'react-hot-loader'

const Whole = () => (
  <Router basename='/ReStory' >
    <App />
  </Router>
)

// const H = hot(module)(Whole)

ReactDOM.hydrate(<Whole />, document.getElementById('root'))

registerServiceWorker()
