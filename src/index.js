import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import App from './router'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'

// import { hot } from 'react-hot-loader'

const res = new Function('React', 'return React.createElement("div",{},1234)')

const Cpn = res(React)

console.log(Cpn)

const Whole = () => (
  <Router>
    <App />
  </Router>
)

// const H = hot(module)(Whole)

ReactDOM.hydrate(<Whole />, document.getElementById('root'))

registerServiceWorker()
