const menuList = [
    {
        title: '首页', //菜单标题名称
        code:'HONE',//编码
        key: '/app/home', //对应的path
        icon: 'project', //图标名称
        color:'#5e72e4',//图标颜色
        parentTitle:'',//父级目录
        tag:'层级层',//标识
        status:'success',//状态
        index:'0'
    },
    {
        title: '商品', //菜单标题名称
        code:'PRODUCT',
        key: '/app/product/main', //对应的path
        icon: 'mail', //图标名称
        color:'#52c41a',//图标颜色
        parentTitle:'',
        tag:'层级层',
        status:'success',
        index:'1',
        children : [
            {
                title: '商品管理', //菜单标题名称
                code:'PRODUCT_ONE',
                key: '/app/product', //对应的path
                icon: 'tags', //图标名称
                color:'#5e72e4',//图标颜色
                parentTitle:'商品',
                tag:'菜单层',
                status:'success',
                index:'11',
            },
            {
                title: '种类管理', //菜单标题名称
                code:'PRODUCT_TWO',
                key: '/app/category', //对应的path
                icon: 'appstore', //图标名称
                color:'#5e72e4',//图标颜色
                parentTitle:'商品',
                tag:'菜单层',
                status:'success',
                index:'12',
            }

        ]
    },
    {
        title: '库存管理', //菜单标题名称
        code:'HOUSE',
        key: '/app/inHouse', //对应的path
        icon: 'database', //图标名称
        color:'#1890FF',//图标颜色
        parentTitle:'',
        tag:'层级层',
        status:'success',
        index:'2',
        children : [
            {
                title: '入库管理', //菜单标题名称
                code:'IN_HOUSE',
                key: '/app/in_House', //对应的path
                icon: 'right-square', //图标名称
                color:'#5e72e4',//图标颜色
                parentTitle:'库存管理',
                tag:'菜单层',
                status:'success',
                index:'21',
            },
            {
                title: '出库管理', //菜单标题名称
                code:'OUT_HOUSE',
                key: '/app/out_house', //对应的path
                icon: 'left-square', //图标名称
                color:'#5e72e4',//图标颜色
                parentTitle:'库存管理',
                tag:'菜单层',
                status:'success',
                index:'22',
            }
        ]
    },
    {
        title: '收益管理', //菜单标题名称
        code:'MONEY',
        key: '/app/money', //对应的path
        icon: 'dollar', //图标名称
        color:'#fb6340',//图标颜色
        parentTitle:'',
        tag:'层级层',
        status:'success',
        index:'3',
    },
    {
        title: '设置', //菜单标题名称
        code:'SETTING',
        key: '/app/user/main', //对应的path
        icon: 'setting', //图标名称
        color:'#1890FF',//图标颜色
        parentTitle:'',
        tag:'层级层',
        status:'success',
        index:'4',
        children : [
            {
                title: '用户管理', //菜单标题名称
                code:'USER_SETTING',
                key: '/app/user', //对应的path
                icon: 'idcard', //图标名称
                color:'#f3a4b5',//图标颜色
                parentTitle:'设置',
                tag:'菜单层',
                status:'success',
                index:'41',
            },
            {
                title: '角色管理', //菜单标题名称
                code:'ROLE_SETTING',
                key: '/app/role', //对应的path
                icon: 'contacts', //图标名称
                color:'#5e72e4',//图标颜色
                parentTitle:'设置',
                tag:'菜单层',
                status:'success',
                index:'42',
            },
            {
                title: '菜单管理', //菜单标题名称
                code:'MEUN_SETTING',
                key: '/app/menu', //对应的path
                icon: 'contacts', //图标名称
                color:'#5e72e4',//图标颜色
                parentTitle:'设置',
                tag:'菜单层',
                status:'success',
                index:'43',
            }
        ]
    },
];


//默认暴露

export default menuList




// import memoryUtils from "../utils/memoryUtils";
// import {getRoutes} from "../api";
//
// const user = localStorage.user;
//
// function getRoutesData() {
//     console.log(user.userId);
//     return getRoutes(user.userId);
// }
// default export const menuList = async function menuList() {
//     return await getRoutes(memoryUtils.user.Id);
// }
