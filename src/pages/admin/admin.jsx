import React, {Component} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import { Layout } from 'antd';
import memoryUtils from "../../utils/memoryUtils";
import "./admin.less"
import LeftNav from "../../components/left-nav/left-nav";
import Header from "../../components/header/header";
import {routeModules} from '../../utils/getModuleRouters';
import NotFound from "../not-found/not-found";
const {Sider, Content } = Layout;


/*
管理的路由界面
 */

export default class Admin extends Component {


    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
    };

    render() {
        const user = memoryUtils.user;

        //如果内存中没有user 说明当前没有登录
        if (!user || !user.userId) {
            return <Redirect to='/user/login'/>
        }
        return (
            <Layout style={{height:'100%'}}>
                <Sider  theme="dark" collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header/>
                    <Content style={{margin: '10px 10px', padding: 10, minHeight: 280,}}>
                        <Switch>
                            <Redirect exact from='/' to='app/home'/>
                            {
                                routeModules.map((item,index)=>{
                                    return (
                                        <Route key={index} path={item.path} component={item.component}/>
                                    )
                                })
                            }
                            <Route component={NotFound}/>
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
