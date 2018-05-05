import React from 'react'
import { Layout } from 'antd'
import { BrowserRouter as Router } from 'react-router-dom'
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
const Level = window.level

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
            <HeaderBody navi={Config.navi} />
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
            <SiderBody level={Level} />
          </Sider>
          <Layout style={{ marginLeft: SiderWidth, marginTop: HeaderHeight }}>
            <Content
              style={{
                overflow: 'initial',
                display: 'flex',
                justifyContent: 'center',
                background: '#fff'
              }}
            >
              <ContentBody component={MdxComponent} />
            </Content>
            <Footer style={{ textAlign: 'center', background: '#fff' }}>ReactStory ©2018 Created by ZhengFang</Footer>
          </Layout>
        </Layout>
      </Router>
    )
  }
}

/**
 * 用户输入地址 ---> 解析地址下的md文件
 *                       |
 *                       |
 *                       v
 *                  生成顶部导航栏
 *                       |
 *                       |
 *                  是否渲染首页
 *                       |
 *        yes            |
 *   render index page<--|
 *                       |no
 *                       v
 *                  渲染导航栏第一个---->生成Sider
 *
 */
