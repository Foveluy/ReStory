import React from 'react'
import './index.css'

import { HashRouter as Router, Route } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import Config from './reactstory.config'
import { RSMenu } from './menu'
import { RSDropdown } from './rscomponent/dropdown'
import TestHello from './test.md'
import { CodeBlock } from './rscomponent/codeblock'
import markdown from './rscomponent/markdown'

const { Header, Content, Footer, Sider } = Layout

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

const Border = '1px solid rgb(232, 232, 232)'
const SiderWidth = 320

export default class App extends React.Component {
  render() {
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
            zIndex: 3
          }}
        >
          <div className="logo">ReactStory</div>
          <RSDropdown onClick={this.handleClick} currentSelectKey="0" mode="horizontal">
            {Config.navigation.map((navi, index) => {
              return <RSDropdown.Item key={index}>{navi.title}</RSDropdown.Item>
            })}
          </RSDropdown>
        </Header>
        <Sider
          style={{
            height: '100vh',
            position: 'fixed',
            left: 0,
            background: 'white',
            borderRight: Border,
            marginTop: 64
          }}
          width={SiderWidth}
        >
          <RSMenu title="指南">
            {Config.sider.map((item, index) => {
              const type = item.type
              if (type === 'md') {
                return (
                  <RSMenu.SubMenu key={index} title={<span>{item.name}</span>}>
                    {item.title.map((t, idx) => <RSMenu.Item key={index + '' + idx}>{t}</RSMenu.Item>)}
                  </RSMenu.SubMenu>
                )
              } else if (type === 'dir') {
              }
            })}
          </RSMenu>
        </Sider>
        <Layout style={{ marginLeft: 320, marginTop: 64 }}>
          <Content
            style={{
              overflow: 'initial',
              display: 'flex',
              justifyContent: 'center',
              background: '#fff'
            }}
          >
            <div
              className="rs-body-markdown-body"
              style={{
                padding: 24,
                background: '#fff',
                width: '100%',
                maxWidth: 740
              }}
            >
              <TestHello components={markdown} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center', background: '#fff' }}>Ant Design ©2016 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
  }
}
