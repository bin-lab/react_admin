import React, {Component} from 'react'
import { Form, Icon, Input, Button, message } from 'antd';
import {Redirect} from 'react-router-dom';
import './login.less'
import logo from '../../assets/images/blue.png';
import {reqlogin} from "../../api";
import storageUtils from "../../utils/storageUtils";
import memoryUtils from "../../utils/memoryUtils";
/*
登陆的路由界面
 */

 class Login extends Component {

    //提交方法
    handleSubmit = (event) => {
        //阻止事件的默认提交功能额
        event.preventDefault();

        //await 使用 需要在当前方法左边添加 async
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                //console.log('Received values of form: ', values);

                //请求的参数
                const {username,password} = values;

                /*
                    ajax两种写法
                    1.简单使用


                     (1)请求登录方法


                    2.await 使用
                 */

                //(1)请求登录方法
                // reqlogin(username,password).then(response => {
                //     console.log("成功了",response.data)
                // }).catch(error => {
                //     console.log("失败了",error)
                // });


                //TODO : 待测试

                //(2)请求登录方法
               const response = await reqlogin(username,password);


                //请求完成后处理返回的数据状态
                const result = response.data;
                //const result = {status:0};
                if (result.status === 0) {
                    //登陆成功
                    message.success('登陆成功');

                    //登陆成功后 存储当前用户信息

                    const user = result.data;
                    //const user = {"_id":1111,"username":'admin'};
                    //保存用户到内存中
                    memoryUtils.user = user;
                    //保存用户信息到本地持久层
                    storageUtils.saveUser(user);

                    /*
                        成功后跳转界面
                        不需要回退到登陆界面使用replace();
                        需要回退到登陆界面 push();
                     */

                    this.props.history.replace('/');


                } else {
                    //登陆失败
                    message.error(result.message);
                }


            } else {
                console.log('校验失败');
            }
        });
        //获得form对象
        //const form = this.props.form;
        //获取表单项的输入数据
        //const values = form.getFieldsValue();
        //console.log(values);
    };

    render() {

        //如果用户已经登陆，自动跳转管理界面
        const  user = memoryUtils.user;
        if (user && user._id) {
            return <Redirect to='/'/>
        }

        const { getFieldDecorator } = this.props.form;
        return (
            <div className='login'>
                <header className='login-header'>
                    <a className="navbar-brand" href="">
                        <img src={logo} alt='logo'/>
                    </a>
                    <h3>Application Project</h3>
                </header>
                <section className='login-content'>
                    <div className='login-name'>登录 使用</div>
                    <Form className="login-form" onSubmit={this.handleSubmit}>
                        <Form.Item>
                            {getFieldDecorator('username', {
                                //声明式验证
                                rules: [
                                    { required: true, whiteSpace:true, message: '用户名必须输入!' },
                                    { min: 4, message: '用户名至少4位!' },
                                    { max: 12, message: '用户名最多12位!' },
                                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字、下划线组成!' }
                                    ],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="用户名"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [
                                    { required: true, message: '密码必须输入!' }
                                    ],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="密码"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>

                            <a className="login-form-forgot" href="">
                                忘记密码
                            </a>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                确认登陆
                            </Button>
                            或者 <a href="">创建用户!</a>
                        </Form.Item>
                    </Form>
                </section>
                <footer className="login-footer">
                    <div className="copyright">
                        © 2019 <a href="" className="font-weight-bold ml-1"
                                  target="_blank">Creative Bin</a>
                    </div>
                </footer>
            </div>
        )
    }
}

//包装Form组件生成新的组件
const WrapLogin = Form.create({name:'normal_login'})(Login);
export default WrapLogin;


/*
    1.高阶函数
        1)一类特别的函数
            接收函数类型的参数
            返回值是函数
    2.高阶组件
 */


/*
1.前台表单校验
2.收集表单输入数据
 */
