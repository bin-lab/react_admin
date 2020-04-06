/*
    要求：能根据接口文档定义接口请求
    包含应用中所有的接口请求函数的模块
    每个函数的返回值都是promise
 */

import  ajax from './ajax'


const BASE = '';

//登录

export const reqlogin = (username, password) => ajax('/user/login', {username, password}, 'POST');

//添加用户

export const reqAddUser = (user) => ajax(BASE +'/user/register', user, 'POST');


//更新用户
export const updateUser = (user) => ajax(BASE +'/user/updateUser', user, 'POST');



/*
    商品模块
 */

//商品分类模块

//1> 获取一级/二级分类列表
export const reqCategorys = (parentId) => ajax(BASE + 'manage/category/list', {parentId});

//2>添加分类数据
export const reqAddCategory = ({categoryTypeName, parentId}) => ajax(BASE + 'manage/category/add', {categoryTypeName, parentId}, 'POST');

//3>更新分类
export const reqUpdateCategory = ({categoryLineId, categoryTypeName}) => ajax(BASE + 'manage/category/update', {categoryLineId, categoryTypeName}, 'POST');


export const reqwest = (results) =>ajax('https://randomuser.me/api',{results},'GET');


/*
    菜单路由获取
 */
export const getRoutes = (userId) => ajax(BASE + 'sys/menu/24', {userId}, 'GET');

export const updateMenu = (menu) => ajax(BASE + 'sys/menu/updateMenu', menu, 'POST');



//获取所有角色的列表

export const  reqRoles = () => ajax(BASE +'manage/role/list','POST');

//添加角色信息
export const  reqAddRole = (role) =>ajax(BASE +'/role/register',role,'POST');

//更新角色权限信息
export const  updateAuthRole = (role) =>ajax(BASE +'/role/updateAuth',role,'POST');
