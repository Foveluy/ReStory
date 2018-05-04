import React from 'react'
import { render } from 'react-dom'

render(<div>231a3111dasdd3d</div>, document.getElementById('root'))

if (module.hot) {
  module.hot.accept('./index.js', function() {
    // Do something with the updated library module...\
    console.log('记载')
  })
}
