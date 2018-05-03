import React from 'react'
import ReactDOM from 'react-dom'
import { message } from 'antd'
import registerServiceWorker from './registerServiceWorker'
import App from './router'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
