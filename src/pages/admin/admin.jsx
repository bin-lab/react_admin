import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'


import memoryUtils from "../../utils/memoryUtils";


/*
管理的路由界面
 */

export default class Admin extends Component {
    render() {

        const user = memoryUtils.user;

        //如果内存中没有user 说明当前没有登录
        if (!user || !user._id) {
            return <Redirect to='/login'/>
        }
        return (
            <div>Hello {user.username}</div>
        )
    }
}
