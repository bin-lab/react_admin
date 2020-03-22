import React,{Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom' //路由

import Login from './pages/login/login'
import Register from './pages/login/register'
import Admin from './pages/admin/admin'
/*
应用组件
 */

export default class App extends Component{

    render () {
        return (
            <BrowserRouter>
                <Switch>{/*只会匹配其中一个*/}
                    <Route path='/user/login' component={Login}></Route>
                    <Route path='/user/register' component={Register}></Route>
                    <Route path='/' component={Admin}></Route>
                </Switch>
            </BrowserRouter>
        )
    }

}
