import React from 'react'
import { Layout, Button, Icon } from 'antd'
import { withRouter, Route, Link } from 'react-router-dom'
import ContentBody from './content'
import SiderBody from './sider'
import HeaderBody from './header'
import { isSSR } from './util'
import FrontPage from './frontpage'

// import './index.css'
// import { hot } from 'react-hot-loader'

// const H = hot(module)(A)

const { Content, Footer, Header, Sider } = Layout
const Border = '1px solid rgb(232, 232, 232)'
const HeaderWithRouter = withRouter(HeaderBody)
const SiderWithRouter = withRouter(SiderBody)

// here is the object for react-story loader injection.
var globals = {}

@withRouter
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
    isSSR(win => {
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
    })
  }
  shouldComponentUpdate(p, s) {
    return s.collapsed !== this.state.collapsed || this.props.location.pathname !== p.location.pathname
  }

  componentWillUnmount() {
    isSSR(win => {
      win.removeEventListener('resize', this.resize)
    })
  }

  componentDidMount() {
    isSSR(win => {
      if (win.innerWidth <= 769) {
        this.setState({
          collapsed: true,
          SiderWidth: 0,
          collapsedButtonShow: true
        })
      }
      win.addEventListener('resize', this.resize)
    })
  }

  collapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
      SiderWidth: this.state.collapsed ? 200 : 0
    })
  }
  siderClose = () => {
    this.setState({
      collapsed: true,
      SiderWidth: 0
    })
  }

  renderSider = (Config, MdxComponent, READMEMDX) => {
    if (this.props.location.pathname === '/') return null
    return (
      <Sider
        collapsedWidth={0}
        collapsed={this.state.collapsed}
        style={{
          paddingTop: this.state.HeaderHeight,
          height: '100vh',
          position: 'fixed',
          left: 0,
          background: 'white',
          borderRight: Border,
          overflow: 'auto'
        }}
        width={this.state.SiderWidth}
      >
        {this.state.collapsedButtonShow ? (
          <HeaderWithRouter navi={Config && Config.navi} {...this.state} mode="inline" />
        ) : null}
        <SiderWithRouter {...this.state} />
      </Sider>
    )
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
            zIndex: 3,
            position: 'fixed',
            borderBottom: Border,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: this.state.HeaderHeight
          }}
        >
          <div className="logo">
            <Link to={'/'}>{this.state.siteConfig.title}</Link>
          </div>
          {this.state.collapsedButtonShow ? null : <HeaderWithRouter navi={Config && Config.navi} {...this.state} />}
        </Header>
        {this.renderSider(Config, MdxComponent, READMEMDX)}
        <Layout
          style={{
            marginTop: this.state.HeaderHeight,
            marginLeft: this.props.location.pathname === '/' ? 0 : this.state.SiderWidth
          }}
        >
          <Content
            style={{
              overflow: 'initial',
              display: 'flex',
              justifyContent: 'center',
              background: '#fff'
            }}
          >
            {this.props.location.pathname === '/' ? (
              <Route exact path="/" component={FrontPage} />
            ) : (
              <ContentBody component={MdxComponent} readme={READMEMDX} />
            )}
          </Content>
          <Footer style={{ textAlign: 'center', background: '#fff' }}>ReactStory ©2018 Created by ZhengFang</Footer>
        </Layout>
      </Layout>
    )
  }
}
