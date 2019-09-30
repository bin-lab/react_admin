import React, {Component} from 'react'
import { Form, Icon, Input, Button } from 'antd';
import './login.less'
import logo from './images/blue.png';
/*
登陆的路由界面
 */

 class Login extends Component {

    //提交方法
    handleSubmit = (event) => {
        //阻止事件的默认提交功能额
        event.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
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
