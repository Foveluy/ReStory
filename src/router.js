import React from 'react'
import { Layout, Button, Icon } from 'antd'
import { withRouter } from 'react-router-dom'
import ContentBody from './content'
import SiderBody from './sider'
import HeaderBody from './header'
// import './index.css'
import { hot } from 'react-hot-loader'

// const H = hot(module)(A)

const { Content, Footer, Header, Sider } = Layout
const Border = '1px solid rgb(232, 232, 232)'
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
      siteConfig: globals.siteConfig,
      collapsed: false,
      SiderWidth: 320,
      HeaderHeight: 58,
      collapsedButtonShow: false
    }
  }

  resize = () => {
    const win = window
    if (win.innerWidth <= 769) {
      this.setState({
        collapsed: true,
        SiderWidth: 0,
        collapsedButtonShow: true
      })
    } else {
      this.setState({
        collapsed: false,
        SiderWidth: 320,
        collapsedButtonShow: false
      })
    }
  }
  shouldComponentUpdate(p, s) {
    return true
    // return s.collapsed !== this.state.collapsed
  }

  componentWillMount() {
    const win = window
    win.removeEventListener('resize', this.resize)
  }

  componentDidMount() {
    const win = window

    if (win.innerWidth <= 769) {
      this.setState({
        collapsed: true,
        SiderWidth: 0,
        collapsedButtonShow: true
      })
    }
    win.addEventListener('resize', this.resize)
  }

  collapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      SiderWidth: this.state.collapsed ? 320 : 0
    })
  }
  siderClose = () => {
    this.setState({
      collapsed: true,
      SiderWidth: 0
    })
  }

  render() {
    const { Config, MdxComponent, READMEMDX } = this.state
    return (
      <Layout>
        <Header
          style={{
            padding: 25,
            background: '#fff',
            width: '100%',
            top: 0,
            position: 'fixed',
            borderBottom: Border,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            zIndex: 3,
            height: this.state.HeaderHeight
          }}
        >
          <Button
            ghost={true}
            type="primary"
            onClick={this.collapsed}
            style={{ display: this.state.collapsedButtonShow ? '' : 'none', marginRight: 12 }}
          >
            <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
          </Button>
          {/* <HeaderWithRouter navi={Config && Config.navi} {...this.state} /> */}
        </Header>
        <Sider
          collapsedWidth={0}
          collapsed={this.state.collapsed}
          style={{
            height: '92vh',
            position: 'fixed',
            left: 0,
            zIndex: 10,
            background: 'white',
            borderRight: Border,
            marginTop: this.state.HeaderHeight,
            overflow: 'scroll'
          }}
          width={this.state.SiderWidth}
        >
          <HeaderWithRouter navi={Config && Config.navi} {...this.state} />
          <SiderWithRouter {...this.state} />
        </Sider>
        <Layout style={{ marginLeft: this.state.SiderWidth }} onClick={this.siderClose}>
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
