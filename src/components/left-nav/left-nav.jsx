import React, {Component} from 'react'
import logo from "../../assets/images/blue.png";

import {Link} from 'react-router-dom';
import { Menu, Icon } from 'antd';
/*
    左侧导航组件
 */
const { SubMenu } = Menu;

export default class leftNav extends Component {
    render() {
        return (
            <div className='left-nav'>
                <Link to='/' className="logo">
                    <img src={logo} alt='logo'/>
                </Link>

                <Menu mode="inline" >
                    <Menu.Item key="0" >
                        <Icon type="project" theme="twoTone" twoToneColor="#5e72e4"/>
                        <span>首页</span>
                    </Menu.Item>
                    <SubMenu key="sub1" title={
                        <span>
                              <Icon type="mail" theme="twoTone" twoToneColor="#52c41a"/>
                              <span>商品</span>
                        </span> }>
                        <Menu.Item key="1">
                            <Icon type="appstore" theme="twoTone"/>
                            <span>种类管理</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="tags" theme="twoTone"/>
                            <span>商品管理</span>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={
                        <span>
                                  <Icon type="database" theme="twoTone"/>
                                  <span>库存管理</span>
                        </span> }>
                        <Menu.Item key="3">
                            <Icon type="left-square" theme="twoTone"/>
                            <span>入库管理</span>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="right-square" theme="twoTone"/>
                            <span>出库管理</span>
                        </Menu.Item>
                    </SubMenu>

                    <Menu.Item key="5">
                        <Icon type="dollar" theme="twoTone" twoToneColor="#fb6340"/>
                        <span>收益管理</span>
                    </Menu.Item>
                    <Menu.Item key="6">
                        <Icon type="setting" theme="twoTone"/>
                        <span>设置</span>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}
