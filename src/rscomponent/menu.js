// @flow

import React, { cloneElement } from 'react'
import './menu.less'

const Menu = ({ children, title }) => {
  return (
    <ul className={`rs-menu`}>
      <p
        style={{
          fontSize: '1.25em',
          fontWeight: 'bold',
          marginTop: '.5rem',
          marginBottom: '.5rem'
        }}
      >
        {title}
      </p>
      {children}
    </ul>
  )
}

Menu.Item = ({ children, style, onClick, className = 'rs-menu rs-menu-item' }) => {
  return (
    <li className={className} style={style} onClick={onClick}>
      {children}
    </li>
  )
}

class SubMenu extends React.Component {
  state = {
    collapse: false,
    currentSelectKey: ''
  }

  onClick = (e, key, from) => {
    e.stopPropagation()
    this.props.onClick && this.props.onClick(e, key, from)
    // from-SubMenu means mene-item is wrapping
    // in a submeue
    if (from !== 'from-SubMenu') {
      this.setState({
        // collapse: !this.state.collapse,
        currentSelectKey: ''
      })
    } else {
      this.setState({
        currentSelectKey: key + ''
      })
    }
  }

  render() {
    const { children, title } = this.props
    const show = this.state.collapse
      ? {
          display: 'none'
        }
      : void 666
    return (
      <Menu.Item>
        <ul className="rs-menu rs-sub-menu">
          <li onClick={this.onClick} className={this.state.collapse ? 'title close' : 'title open'}>
            {title}
          </li>
          {React.Children.map(children, one => {
            if (one) {
              return cloneElement(one, {
                className:
                  one.key === this.state.currentSelectKey ? 'rs-menu rs-menu-item selected' : 'rs-menu rs-menu-item',
                style: show,
                onClick: e => this.onClick(e, one.key, 'from-SubMenu')
              })
            } else {
              return null
            }
          })}
        </ul>
      </Menu.Item>
    )
  }
}

Menu.SubMenu = SubMenu

export const RSMenu = Menu
