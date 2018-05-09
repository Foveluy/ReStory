import React from 'react'
import { Layout } from 'antd'
import { withRouter } from 'react-router-dom'
import ContentBody from './content'
import SiderBody from './sider'
import HeaderBody from './header'
import './index.css'
import { hot } from 'react-hot-loader'

// const H = hot(module)(A)

const { Content, Footer, Header, Sider } = Layout
const Border = '1px solid rgb(232, 232, 232)'
const SiderWidth = 320
const HeaderHeight = 58

const HeaderWithRouter = withRouter(HeaderBody)
const SiderWithRouter = withRouter(SiderBody)
const ContentWithRouter = withRouter(ContentBody)

// here is the object for react-story loader injection.
var globals = {}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    //injection
    this.state = {
      Config: globals.Config,
      MdxComponent: globals.component,
      READMEMDX: globals.README,
      siteConfig: globals.siteConfig
    }
  }

  render() {
    const { Config, MdxComponent, READMEMDX } = this.state
    return (
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
          <HeaderWithRouter navi={Config && Config.navi} {...this.state} />
        </Header>
        <Sider
          style={{
            height: '100vh',
            position: 'fixed',
            left: 0,
            background: 'white',
            borderRight: Border,
            marginTop: HeaderHeight,
            overflow: 'auto'
          }}
          width={SiderWidth}
        >
          <SiderWithRouter {...this.state} />
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
    )
  }
}
