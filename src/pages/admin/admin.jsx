import React, {Component} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';
import memoryUtils from "../../utils/memoryUtils";
import "./admin.less"
import LeftNav from "../../components/left-nav/left-nav";
import Header from "../../components/header/header";
import Home from "../home/home";
import Category from "../category/category";
import Product from "../product/product";
import Role from "../role/role";
import User from "../user/user";
import Setting from "../setting/setting";

const { Footer, Sider, Content } = Layout;


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
                    <Header/>
                    <Content style={{margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,}}>
                       {/*路由控制*/}
                        <Switch>
                            <Route path='/home' component={Home}/>
                            <Route path='/category' component={Category}/>
                            <Route path='/product' component={Product}/>
                            <Route path='/role' component={Role}/>
                            <Route path='/user' component={User}/>
                            <Route path='/setting' component={Setting}/>
                            {/*默认显示路径*/}
                            <Redirect to='/home'/>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
