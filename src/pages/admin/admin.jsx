import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';
import memoryUtils from "../../utils/memoryUtils";
import "./admin.less"
import LeftNav from "../../components/left-nav/left-nav";

const { Header,Footer, Sider, Content } = Layout;


/*
管理的路由界面
 */

export default class Admin extends Component {


    state = {
        collapsed: false,
    };

    render() {

        const user = memoryUtils.user;

        //如果内存中没有user 说明当前没有登录
        if (!user || !user._id) {
            return <Redirect to='/login'/>
        }
        return (
            <Layout style={{height:'100%'}}>
                <Sider trigger={null}  collapsible collapsed={this.state.collapsed}>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>

                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                            minHeight: 280,
                        }}
                    >
                        Content
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
