import React from 'react'
import { Menu } from 'antd'
import { Link, Redirect, withRouter } from 'react-router-dom'

import './index.less'

const MenuLink = ({ children, className = '' }) => {
  return (
    <a className={`rs-link`} href={`#${children}`}>
      {children}
    </a>
  )
}

const collectOpenkeys = header => {
  let openKeys = []
  header.forEach(map => {
    // what we do here is collecting
    // the openKeys for submenu
    if (map[1].length !== 0) openKeys.push(map[0])
  })
  return openKeys
}

@withRouter
export default class S extends React.Component {
  state = {
    selectedKeys: []
  }

  shouldComponentUpdate(next) {
    // return false
    return true
  }

  onSelect = ({ item, key, selectedKeys }) => {
    this.setState({
      selectedKeys: selectedKeys
    })
  }

  onOpenChange = openKeys => {
    this.setState({
      selectedKeys: []
    })
  }

  renderMenue = header => {
    return header.map((levelone, index) => {
      // the first layer is how many `level 1` title
      const level1 = levelone[0]

      if (level1 === 'no-h1') {
        // means there is no h1 title beyond h2
        return levelone[1].map((leveltwo, index) => {
          // the second layer is how many `level 2` title
          return (
            <Menu.Item key={leveltwo + index}>
              <MenuLink>{leveltwo}</MenuLink>
            </Menu.Item>
          )
        })
      }
      if (levelone[1].length === 0) {
        // if there is no h2 inside
        return (
          <Menu.Item key={level1 + index}>
            <MenuLink>{level1}</MenuLink>
          </Menu.Item>
        )
      }

      return (
        <Menu.SubMenu title={<MenuLink>{level1}</MenuLink>} key={level1}>
          {levelone[1].map((leveltwo, index) => {
            // the second layer is how many `level 2` title
            return (
              <Menu.Item key={leveltwo + index}>
                <MenuLink>{leveltwo}</MenuLink>
              </Menu.Item>
            )
          })}
        </Menu.SubMenu>
      )
    })
  }

  renderDirMenu = navi => {
    const children = navi.children
    let openKeys = []
    const menumaping = children.map(file => {
      // the first layer is file
      const header = file.header
      header.forEach(map => {
        // what we do here is collecting
        // the openKeys for submenu
        if (map[1].length !== 0) openKeys.push(map[0])
      })
      return (
        <Menu.SubMenu
          key={'/' + navi.route + '/' + file.route}
          title={
            <Link className="dir-menu-link" to={'/' + navi.route + '/' + file.route}>
              {file.name}
            </Link>
          }
        >
          {this.renderMenue(header)}
        </Menu.SubMenu>
      )
    })
    const path = this.props.location.pathname
    return (
      <Menu
        mode="inline"
        openKeys={[path, ...openKeys]}
        selectedKeys={this.state.selectedKeys}
        onSelect={this.onSelect}
        onOpenChange={this.onOpenChange}
      >
        {menumaping}
      </Menu>
    )
  }

  render() {
    const path = this.props.location.pathname.substring(1)

    const c = this.props.Config.navi.find(i => i.route === path)
    const createMenu = (openKeys, header) => {
      return (
        <Menu
          mode="inline"
          openKeys={openKeys}
          selectedKeys={this.state.selectedKeys}
          onSelect={this.onSelect}
          onOpenChange={this.onOpenChange}
        >
          {this.renderMenue(header)}
        </Menu>
      )
    }

    //判断是否是dir
    //是dir的话sider渲染以md名字开头的dir
    if (c && c.type === 'dir') {
      // when we found a header is dir
      // we redirect to first tab
      const route = '/' + c.route + '/' + c.children[0].route
      return <Redirect to={route} />
    }

    if (path === 'README') {
      const openKeys = collectOpenkeys(this.props.READMEMDX.header)

      return createMenu(openKeys, this.props.READMEMDX.header)
    }

    if (!c) {
      // nested header
      const nested = path.split('/')
      const father = nested[0]
      const f = this.props.Config.navi.find(i => i.route === father)
      if (f) return this.renderDirMenu(f)
      return null
    }

    const openKeys = collectOpenkeys(c.header)
    return createMenu(openKeys, c.header)
  }
}
