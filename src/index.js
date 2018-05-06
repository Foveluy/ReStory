import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import App from './router'
import { Provider } from 'rectx'
import { hot } from 'react-hot-loader'

const A = () => (
  <Provider>
    <App />
  </Provider>
)

const H = hot(module)(A)

ReactDOM.render(<H />, document.getElementById('root'))
registerServiceWorker()
