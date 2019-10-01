const menuList = [
    {
        title: '首页', //菜单标题名称
        key: '/home', //对应的path
        icon: 'project', //图标名称
        color:'#5e72e4',//图标颜色
    },
    {
        title: '商品', //菜单标题名称
        key: '/product', //对应的path
        icon: 'mail', //图标名称
        color:'#52c41a',//图标颜色
        children : [
            {
                title: '商品管理', //菜单标题名称
                key: '/product', //对应的path
                icon: 'tags', //图标名称
                color:'#5e72e4',//图标颜色
            },
            {
                title: '种类管理', //菜单标题名称
                key: '/category', //对应的path
                icon: 'appstore', //图标名称
                color:'#5e72e4',//图标颜色
            }

        ]
    },
    {
        title: '库存管理', //菜单标题名称
        key: '/inHouse', //对应的path
        icon: 'database', //图标名称
        color:'#1890FF',//图标颜色
        children : [
            {
                title: '入库管理', //菜单标题名称
                key: '/inHouse', //对应的path
                icon: 'right-square', //图标名称
                color:'#5e72e4',//图标颜色
            },
            {
                title: '出库管理', //菜单标题名称
                key: '/outHouse', //对应的path
                icon: 'left-square', //图标名称
                color:'#5e72e4',//图标颜色
            }
        ]
    },
    {
        title: '收益管理', //菜单标题名称
        key: '/money', //对应的path
        icon: 'dollar', //图标名称
        color:'#fb6340',//图标颜色
    },
    {
        title: '设置', //菜单标题名称
        key: '/user', //对应的path
        icon: 'setting', //图标名称
        color:'#1890FF',//图标颜色
        children : [
            {
                title: '用户管理', //菜单标题名称
                key: '/user', //对应的path
                icon: 'idcard', //图标名称
                color:'#f3a4b5',//图标颜色
            },
            {
                title: '角色管理', //菜单标题名称
                key: '/role', //对应的path
                icon: 'contacts', //图标名称
                color:'#5e72e4',//图标颜色
            }
        ]
    },
];


//默认暴露

export default menuList
