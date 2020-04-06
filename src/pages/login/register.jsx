import React, {Component} from 'react';

import {Form, Input, Button, Select, Icon, message} from 'antd';
import logo from "../../assets/images/blue.png";
import memoryUtils from "../../utils/memoryUtils";
import {Redirect} from 'react-router-dom';
import {reqAddUser} from "../../api";


const InputGroup = Input.Group;
const { Option } = Select;
/*
    注册路由
 */

class Register extends Component{

    constructor(props){
        super(props);

        this.state ={
            username:'',
            email:'',
            password:'',
            phoneNumber:''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        loading: false
    };

    enterLoading = () => {
        this.setState({ loading: true });
    };


    //提交方法
    handleSubmit = (event) => {
        //阻止事件的默认提交功能额
        event.preventDefault();

        //await 使用 需要在当前方法左边添加 async
        this.props.form.validateFields(async (err, values) => {
            if (!err) {

                //请求的参数
                this.state = values;



                //请求提交方法
                const response = await reqAddUser(this.state);

                //请求完成后处理返回的数据状态
                const result = response.data;
                console.log(result);
                if (result.success === true) {
                    console.log(response);
                    //登陆成功
                    message.success('保存成功');

                    /*
                        成功后跳转登录界面

                     */

                    this.props.history.replace('/user/login');


                } else {
                    //登陆失败
                    message.error(result.message);
                    this.setState({loading: false});
                }


            } else {
                this.setState({loading: false});
                console.log('校验失败');
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('输入密码两次不一致!');
        } else {
            callback();
        }
    };

    render(){

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
                    <div className='login-name'>用户 注册</div>
                    <Form className="login-form" onSubmit={this.handleSubmit}>
                        <Form.Item>
                            {getFieldDecorator('username', {
                                //声明式验证
                                rules: [
                                    { required: true, whiteSpace:true, message: '用户名必须输入!' },
                                    { min: 2, message: '用户名至少2位!' },
                                    { max: 12, message: '用户名最多12位!' },
                                    // { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字、下划线组成!' }
                                ],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="用户名"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        required: true,
                                        message: '邮箱地址必输',
                                    },
                                    {
                                        type: 'email',
                                        message:'邮箱格式不正确 例子：123@qq.com'
                                    },
                                ],
                            })(
                                <Input
                                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder='邮箱地址' />
                            )}
                        </Form.Item>
                        <Form.Item hasFeedback>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: "请输入密码",
                                    },
                                    {
                                        min: 8,
                                        message: "密码最少8位数",
                                    },
                                ],
                            })(
                                <Input.Password
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="密码"
                                />
                            )}
                        </Form.Item>
                        <Form.Item
                            hasFeedback
                            dependencies={['password']}
                            >
                            {getFieldDecorator('confirm', {
                                rules: [
                                    {
                                        required: true,
                                        message: "请再次输入密码",
                                    },
                                    {
                                        validator: this.compareToFirstPassword,
                                    },
                                ],
                            })(
                                <Input.Password
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="确认密码"
                                    onBlur={this.handleConfirmBlur}
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <InputGroup compact>
                                <Select
                                    value="86"
                                    //onChange={this.changePrefix}
                                    style={{ width: '20%' }}
                                >
                                    <Option value="86">+86</Option>
                                    <Option value="87">+87</Option>
                                </Select>
                                {getFieldDecorator('phoneNumber', {
                                    rules: [
                                        {
                                            required: true,
                                            message: "电话号码必输",
                                        },
                                        {
                                            pattern: /^\d{11}$/,
                                            message: "电话号码为11位",
                                        },
                                    ],
                                })(
                                    <Input
                                        prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        style={{ width: '80%' }}
                                        placeholder="电话号码"
                                    />
                                )}
                            </InputGroup>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={this.state.loading} onClick={this.enterLoading} className="login-form-button">
                                确认注册
                            </Button>
                            或者已有账户 <a href="/user/login">返回登录</a>
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
        );
    }
}

//包装Form组件生成新的组件
const WrapRegister = Form.create({name:'normal_login'})(Register);
export default WrapRegister;
