import React from 'react'
import { Layout } from 'antd'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import ContentBody from './content'
import SiderBody from './sider'
import HeaderBody from './header'
import './index.css'

const { Content, Footer, Header, Sider } = Layout

const Border = '1px solid rgb(232, 232, 232)'
const SiderWidth = 320
const HeaderHeight = 58
const Config = window.Config
const MdxComponent = window.component
const READMEMDX = window.README
const Level = window.level

const HeaderWithRouter = withRouter(HeaderBody)
const SiderWithRouter = withRouter(SiderBody)
const ContentWithRouter = withRouter(ContentBody)

console.log(Config)

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Layout>
          <Header
            style={{
              background: '#fff',
              width: '100%',
              top: 0,
              position: 'fixed',
              borderBottom: Border,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              zIndex: 3,
              height: HeaderHeight
            }}
          >
            <HeaderWithRouter navi={Config.navi} />
          </Header>
          <Sider
            style={{
              height: '100vh',
              position: 'fixed',
              left: 0,
              background: 'white',
              borderRight: Border,
              marginTop: HeaderHeight
            }}
            width={SiderWidth}
          >
            <SiderWithRouter level={Level} />
          </Sider>
          <Layout style={{ marginLeft: SiderWidth }}>
            <Content
              style={{
                overflow: 'initial',
                display: 'flex',
                justifyContent: 'center',
                background: '#fff'
              }}
            >
              <ContentWithRouter component={MdxComponent} readme={READMEMDX} />
            </Content>
            <Footer style={{ textAlign: 'center', background: '#fff' }}>ReactStory ©2018 Created by ZhengFang</Footer>
          </Layout>
        </Layout>
      </Router>
    )
  }
}
