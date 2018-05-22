import React from 'react'
import { Menu } from 'antd'
import { Link, Redirect, withRouter } from 'react-router-dom'
import { isSSR } from '../util'
import flatten from 'array-flatten'

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

  componentDidMount() {
    // window.addEventListener('scroll', this.autoSelectHeader)
  }
  componentWillUnmount() {
    // window.removeEventListener('scroll', this.autoSelectHeader)
  }

  autoSelectHeader = () => {
    //严重计算
    const path = this.currentUrlPath()
    const c = this.props.Config.navi.find(i => i.route === path)

    const nested = path.split('/')
    const father = nested[0]
    const f = this.props.Config.navi.find(i => i.route === father)

    let current = []
    for (let i = 0; i < f.children.length; i++) {
      if (f.children[i].route === nested[1]) {
        current = f.children[i].header
        break
      }
    }
    const elementAry = flatten(current).map(e => document.getElementById(`${e}`))
    elementAry.forEach((el, index) => {
      if (!el) return
      const top = el.getBoundingClientRect().top
      if (top > -10 && top < 10) {
        // performence optimise
        if (this.state.selectedKeys[0] !== el.id) this.onSelect({ selectedKeys: [el.id] })
      }
    })

    if (!c) return

    // const elementAry = flatten(c.header).map(e => document.getElementById(`${e}`))
    // // console.log(elementAry)
    // elementAry.forEach((el, index) => {
    //   const top = el.getBoundingClientRect().top
    //   if (top > -10 && top < 10) {
    //     // performence optimise
    //     if (this.state.selectedKeys[0] !== el.id) this.onSelect({ selectedKeys: [el.id] })
    //   }
    // })
  }

  currentUrlPath = () => {
    return this.props.location.pathname.substring(1)
  }

  onSelect = ({ selectedKeys }) => {
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
            <Menu.Item key={leveltwo}>
              <MenuLink>{leveltwo}</MenuLink>
            </Menu.Item>
          )
        })
      }
      if (levelone[1].length === 0) {
        // if there is no h2 inside
        return (
          <Menu.Item key={level1}>
            <MenuLink>{level1}</MenuLink>
          </Menu.Item>
        )
      }

      return (
        <Menu.SubMenu title={<MenuLink>{level1}</MenuLink>} key={level1}>
          {levelone[1].map((leveltwo, index) => {
            // the second layer is how many `level 2` title
            return (
              <Menu.Item key={leveltwo}>
                <MenuLink>{leveltwo}</MenuLink>
              </Menu.Item>
            )
          })}
        </Menu.SubMenu>
      )
    })
  }

  scrollToTop = () => {
    isSSR(win => {
      win.scrollTo(0, 0)
    })
  }

  renderDirMenu = navi => {
    const children = navi.children
    let openKeys = []
    const path = this.props.location.pathname
    const menumaping = children.map(file => {
      // the first layer is file
      const header = file.header
      header.forEach(map => {
        // what we do here is collecting
        // the openKeys for submenu
        if (map[1].length !== 0) openKeys.push(map[0])
      })
      const Url = '/' + navi.route + '/' + file.route

      // for the color
      const color = Url === path ? '-color' : ''
      return (
        <Menu.SubMenu
          key={Url}
          title={
            <Link onClick={this.scrollToTop} className={`dir-menu-link${color}`} to={Url}>
              {file.name}
            </Link>
          }
        >
          {this.renderMenue(header)}
        </Menu.SubMenu>
      )
    })

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
    const path = this.currentUrlPath()

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

    if (path === 'README' && this.props.READMEMDX) {
      // this.props.READMEMDX might be undefined
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
