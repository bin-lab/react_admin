/*
    要求：能根据接口文档定义接口请求
    包含应用中所有的接口请求函数的模块
    每个函数的返回值都是promise
 */

import  ajax from './ajax'


const BASE = '';

//登录

export const reqlogin = (username, password) =>
    ajax('/login', {username, password}, 'POST');

//添加用户

export const reqAddUser = (user) =>
    ajax('/manage/user/add', user, 'POST');


/*
    商品模块
 */

//商品分类模块

//1> 获取一级/二级分类列表
export const reqCategorys = (parentId) => ajax(BASE + 'manage/category/list', {parentId});

//2>添加分类数据
export const reqaddCategory = ({categoryTypeName, parentId}) => ajax(BASE + 'manage/category/add', {categoryTypeName, parentId}, 'POST');

//3>更新分类
export const reqUpdateCategory = ({categoryLineId, categoryTypeName}) => ajax(BASE + 'manage/category/update', {categoryLineId, categoryTypeName}, 'POST');
