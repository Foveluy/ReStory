// @flow

import React, { cloneElement, Component } from 'react'
import './dropdown.less'

class Dropdown extends Component {
  state = {
    currentSelectKey: ''
  }

  onClick = (e, key) => {
    console.log(key)
    this.setState({
      currentSelectKey: key + ''
    })
  }

  render() {
    const { children, style } = this.props
    return (
      <div className="rs-dropdown" style={style}>
        {React.Children.map(children, one =>
          cloneElement(one, {
            className: one.key === this.state.currentSelectKey ? 'selected' : '',
            onClick: e => this.onClick(e, one.key)
          })
        )}
      </div>
    )
  }
}

Dropdown.Item = ({ children, className, onClick }) => {
  const clsName = `rs-dropdown-item ${className}`
  const child =
    typeof children === 'string' ? (
      <span className={clsName}>{children}</span>
    ) : (
      <div>
        <span className={clsName}>{children}</span>
      </div>
    )

  return <div onClick={onClick}>{child}</div>
}

export const RSDropdown = Dropdown
