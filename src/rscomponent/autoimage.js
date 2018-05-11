import React from 'react'
import './autoimage.less'

export class AutoImage extends React.Component {
  state = {
    loaded: false
  }
  shouldComponentUpdate(p, s) {
    return s.loaded !== this.state.loaded
  }

  render() {
    const { src, className } = this.props
    return (
      <span style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {this.state.loaded ? null : <span className="img-spinner" />}
        <img
          onLoad={() => {
            console.log('家在完成')
            this.setState({
              loaded: true
            })
          }}
          {...this.props}
        />
      </span>
    )
  }
}
