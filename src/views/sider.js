import React from 'react'
import { Menu } from 'antd'
import MdConvertor from '../utils/utils'
import { SiderItem } from '../component/sider-item'
import tst from '../test.md'
import { connect } from 'react-redux'

const SubMenu = Menu.SubMenu

const SubMenuContainer = ({ html, headers }) => {
  return (
    <SubMenu key="sub1" title={<span>subnav 1</span>}>
      {headers.map((item, index) => {
        return (
          <Menu.Item key={`${index}`}>
            <SiderItem text={item.hText} />
          </Menu.Item>
        )
      })}
    </SubMenu>
  )
}

const MenuContainer = ({ dispatch }) => {
  const instance = new MdConvertor()
  const convertor = instance.init()
  const html = convertor.makeHtml(tst)
  dispatch({ type: 'finishedConvert', payload: html })

  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
      {SubMenuContainer({ html, headers: instance.header })}
    </Menu>
  )
}

const mapStateToProps = state => {
  return state.page
}

export default connect(mapStateToProps)(MenuContainer)
