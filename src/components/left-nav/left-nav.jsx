import React, {Component} from 'react'
import logo from "../../assets/images/blue.png";
import menuList from "../../utils/menuConfig";
import memoryUtils from "../../utils/memoryUtils";
import {getRoutes, reqRoles} from '../../api/index'

import {Link, withRouter} from 'react-router-dom';
import { Menu, Icon } from 'antd';
/*
    左侧导航组件
 */
const { SubMenu } = Menu;

class leftNav extends Component {

    state ={menuList:[]};

    //根据menu得数据数组生成标签数组(map集合)
    getMenuNodes = (menuList) => {
        //获取当前地址
        const path = this.props.location.pathname;

        return menuList.map(item =>{

            if (!item.children) {
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} theme="twoTone" twoToneColor={item.color}/>
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {


                //判断是否默认展开
                const cItem = item.children.find(cItem => cItem.key === path);

                //如果存在说明请求的为二级菜单,需要打开
                if (cItem) {
                    //谨记打开的是父级菜单
                    this.openKey= item.key;
                }


                return (
                    <SubMenu key={item.key} title={
                        <span>
                                  <Icon type={item.icon} theme="twoTone" twoToneColor={item.color}/>
                                  <span>{item.title}</span>
                        </span>}>
                        {
                            /*递归方法*/
                            this.getMenuNodes(item.children)
                        }
                    </SubMenu>
                )
            }

        })
    };

    getMenuList = async () =>{
        const result = await getRoutes(memoryUtils.user.userId);
        if (result.success) {
            console.log(result);
            //const menuList = result.data;

            // this.setState({
            //     menuList
            // });
        }
    };

    /*
        在第一次render()之前执行，执行一次
        为第一次render()准备数据（必须同步）
     */
    componentWillMount(){

        this.menuNodes =  this.getMenuNodes(menuList);
    }


    componentDidMount (){
        this.getMenuList();
    };


    render() {

        //获取当前请求的路由路径
        const path = this.props.location.pathname;

        //获取当前需要打开菜单项得key
        const openKey = this.openKey;

        return (
            <div className='left-nav'>
                <Link to='/' className="logo">
                    <img src={logo} alt='logo'/>
                </Link>
                <Menu
                    mode="inline"
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                >

                    {
                        //动态获取菜单项
                        this.menuNodes
                    }

                </Menu>
            </div>
        )
    }
}


/*
    withRouter高阶组件
    包装非路由组件，返回一个新的组件
    新的组件像非路由组件传递三个属性：history/location/match
 */
export default withRouter(leftNav);
