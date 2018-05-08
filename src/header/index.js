import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { RoutingController } from '../controller/state'
import { make } from '../rscomponent/codeblock';

export default class Header extends React.Component {
  handleClick = e => {
    // when we click header
    // we change our title of sider bar
    // this.props.r.switchNavigation(e.value)
    window.scrollTo(0, 0)
    
  }

  shouldComponentUpdate(next) {
    return next.location.pathname !== this.props.location.pathname
  }

  componentDidMount() {
    // when this component got mouted,
    // we change our title of sider bar
    const { navi } = this.props
    const current = navi.find(n => '/' + n === this.props.location.pathname)
    // this.props.r.switchNavigation(current)
  }

  render() {
    const { navi } = this.props
    let current = navi.find(n => '/' + n.route === this.props.location.pathname)
    // todo nested path
    if (!current) {
      const split = this.props.location.pathname.substring(1).split('/')
      const father = split[0]
      // console.log('fater', father)
      for (let idx in navi) {
        const files = navi[idx]
        if (files.type === 'dir') {
          if (files.route === father) {
            current = files
            break
          }
        }
      }
    }

    return (
      <React.Fragment>
        <div className="logo">ReactStory</div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Menu
            onClick={this.handleClick}
            selectedKeys={[current ? current.route : 'readme']}
            mode="horizontal"
            style={{ borderBottomWidth: 0, marginRight: '1rem' }}
          >
            <Menu.Item key={'readme'}>
              <Link to={'/README'}>README</Link>
            </Menu.Item>
            {navi.map((nav, index) => {
              // if (nav.type === 'file') {

              // }
              return (
                <Menu.Item key={nav.route}>
                  <Link to={'/' + nav.route}>{nav.name}</Link>
                </Menu.Item>
              )
            })}
          </Menu>
          <iframe
            title="github-start"
            src="https://ghbtns.com/github-btn.html?user=Foveluy&repo=ReactStory&type=star&count=true"
            frameBorder="0"
            scrolling="0"
            width="150px"
            height="20px"
          />
        </div>
      </React.Fragment>
    )
  }
}
