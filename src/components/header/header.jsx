import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Icon, Popover, Modal} from 'antd';
import './header.less'
import {formateDate} from "../../utils/dateUtils";
import memoryUtils from "../../utils/memoryUtils";
import menuList from "../../config/menuConfig";
import storageUtils from "../../utils/storageUtils";


/*
    头部导航组件
 */
class Header extends Component {

    state = {
        currentTime: formateDate(Date.now())
    };


    getTime = () =>{
        //每隔1S获取当前时间，并更新状态数据currentTime
        this.intervalId = setInterval(()=>{
            const currentTime = formateDate(Date.now());
            this.setState({currentTime});
        },1000)
    };
    /*
        第一次render()之后执行一次
        一般在此执行异步操作：ajax请求/定时器

        定时器
     */
    componentDidMount(){
        this.getTime();
    }



    /*
        退出登录
     */
    logout = () =>{
        Modal.confirm({
            title: '确定退出吗?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk:() => {
                console.log('OK');
                //删除保存的user数据
                storageUtils.removeuser();
                memoryUtils.user = {};
                //跳转到登陆界面
                this.props.history.replace('/login');
            }
        })
    };

    /*
        关闭定时器 在当前组件卸载之前
     */

    componentWillUnmount(){
        //请求定时器
        clearInterval(this.intervalId);
    }


    getTitle = () =>{
        //获取当前请求路径
        const path = this.props.location.pathname;
        let title;
        menuList.forEach(item =>{
            //如果当前item对象的key与path一样，item的title就是需要显示的title
            if (item.key === path) {
                title = item.title;
            } else if (item.children) {
                //在所有的子 item 查找匹配的
                const cItem = item.children.find(cItem => cItem.key === path);
                //如果有之才说明有匹配的
                if (cItem) {
                    title = cItem.title;
                }
            }
        });
        return title;
    };

    render(){

        //获取当前时间
        const {currentTime} = this.state;

        //获取当前登录用户名
        const username = memoryUtils.user.username;

        //得到当前需要的title
        const title = this.getTitle();

        return (
            <div className='header'>
                <div className='header-top'>
                    <span>{currentTime}</span>
                    <Popover
                        content={<div className='dropdown'>
                            <a><Icon type="user"/> <span>个人中心</span></a>
                            <a><Icon type="setting"/> <span>个人设置</span></a>
                            <div className='dropdown-divider'></div>
                            <a onClick={this.logout}>

                            <Icon type="logout"/> <span>退出登录</span></a>
                    </div>} placement="bottomLeft" trigger="hover" arrowPointAtCenter>
                        <img src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"/>
                    </Popover>
                    欢迎, {username}
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>
                        {title}
                    </div>
                </div>
            </div>
        )
    }
}


export default withRouter(Header)
