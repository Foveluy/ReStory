import React from 'react'
import './index.css'

import { HashRouter as Router, Route, Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'

import tst from './test.md'
import MdConvertor from './utils/utils'

const { SubMenu } = Menu
const { Header, Content, Footer, Sider } = Layout

const instance = new MdConvertor()
const convertor = instance.init()
const html = convertor.makeHtml(tst)

const Page = () => {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

class ItemCli extends React.Component {
  onClick = () => {
    if (document.getElementById(this.props.text)) {
      // #todo 除去document使用变量代替
      const s = document.getElementById(this.props.text).offsetTop
      const a = []
      const os = s - window.scrollY
      for (let i = 0; i < 10; i++) {
        a.push(os / 10)
      }
      requestAnimationFrame(() => {
        this.scroll(a)
      })
    }
  }

  scroll = ary => {
    if (ary.length === 0) return
    window.scrollTo(0, window.scrollY + ary[0])
    ary.shift()
    requestAnimationFrame(() => {
      this.scroll(ary)
    })
  }

  render() {
    return (
      <div onClick={this.onClick} style={{ fontSize: 12 }}>
        {this.props.text}
      </div>
    )
  }
}

const makeMenu = () => {
  return (
    <SubMenu
      key="sub1"
      title={
        <span>
          <Icon type="user" />subnav 1
        </span>
      }
    >
      {instance.header.map((item, index) => {
        return (
          <Menu.Item key={`${index}`}>
            <span>
              <ItemCli text={item.hText} />
            </span>
          </Menu.Item>
        )
      })}
    </SubMenu>
  )
}

const Page2 = () => {
  return <div>哈希</div>
}

export default () => {
  return (
    <div className="rootWrapper">
      <Router>
        <Layout>
          <Sider
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0
            }}
            breakpoint="lg"
            collapsedWidth="0"
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type)
            }}
          >
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              {makeMenu()}
            </Menu>
          </Sider>
          <Layout style={{ marginLeft: 200 }}>
            <Header style={{ background: '#fff', padding: 0 }} />
            <Content
              style={{
                margin: '24px 16px 0',
                overflow: 'initial'
              }}
            >
              <div
                style={{
                  padding: 24,
                  background: '#fff',
                  textAlign: 'center'
                }}
              >
                <div className="router-wrapper">
                  <Route exact path="/" component={Page} />
                  <Route exact path="/admin" component={Page2} />
                </div>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>ZhiHu@ZhengFang</Footer>
          </Layout>
        </Layout>
      </Router>
    </div>
  )
}
