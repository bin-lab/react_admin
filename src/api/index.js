/*
    要求：能根据接口文档定义接口请求
    包含应用中所有的接口请求函数的模块
    每个函数的返回值都是promise
 */

import  ajax from './ajax'



//登录

export const reqlogin = (username, password) =>
    ajax('/login', {username, password}, 'POST');

//添加用户

export const reqAddUser = (user) =>
    ajax('/manage/user/add', user, 'POST');
