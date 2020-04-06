import React, {Component} from 'react';
import {Form, Button, Row, Input, Select, InputNumber, Icon, Tag, Badge, Col} from 'antd';
import PropTypes from "prop-types";
import {colors, icons, status} from "../../utils/constants";
import {reqRoles, updateUser} from "../../api/index";


const { Option } = Select;
/*
    添加分类from组件
 */

class EditDrawer extends Component{

    static propTypes ={
        editFlag: PropTypes.string,
        user: PropTypes.object
    };

    constructor (props){
        super(props);

        this.state ={
            roles:[
                {
                    "menus":[
                        "/app/home",
                    ],
                    "id":123456,
                    "roleName":"角色1",
                    "roleCode":"code_1",
                    "createTime": "2020-03-29",
                    "_v":0,
                    "authTime":"2020-03-29",
                    "authUserName": "admin"
                },
                {
                    "menus":[
                        "/app/home",
                        "/app/category"
                    ],
                    "id":254163,
                    "roleName":"角色2",
                    "roleCode":"code_2",
                    "createTime": "2020-03-29",
                    "_v":0,
                    "authTime":"2020-03-29",
                    "authUserName": "admin"
                },
                {
                    "menus":[
                        "/app/home",
                        "/app/category"
                    ],
                    "id":34568,
                    "roleName":"角色3",
                    "roleCode":"code_3",
                    "createTime": "2020-03-29",
                    "_v":0,
                    "authTime":"2020-03-29",
                    "authUserName": "admin"
                },
                {
                    "menus":[
                    ],
                    "id":99999,
                    "roleName":"角色4",
                    "roleCode":"code_4",
                    "createTime": "2020-03-29",
                    "_v":0,
                    "authTime":"2020-03-29",
                    "authUserName": "admin"
                }
            ], //所有角色列表
        }
    };

    //获取所有角色的列表
    getRoles = async () =>{
        const result = await reqRoles();
        if (result.success) {
            const roles = result.data;
            this.setState({
                roles
            })
        }

    };

    //更新用户权限
    updateUser = () =>{

        //await 使用 需要在当前方法左边添加 async
        this.props.form.validateFields(async (err, values) => {

            if (!err) {
                //关闭窗口
                this.props.onClose();

                values.id = this.props.user.id;
                console.log(values);

                //请求提交方法
                const response = await updateUser(values);
            }
        });


    };

    componentDidMount (){
        //this.getRoles();
    };


    render(){

        const { getFieldDecorator } = this.props.form;

        const { editFlag , user} = this.props;

        const {roles} = this.state;

        const layout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
        };


        return (
            <div>

                <Form {...layout} hideRequiredMark >
                    <Row >
                        <Form.Item label="用户名">
                            {getFieldDecorator('userName', {
                                initialValue: editFlag === 'edit' ? user.userName:null,
                                rules: [{ required: true, message: '用户名必输' }],
                            })(<Input/>)}
                        </Form.Item>
                    </Row>
                    <Row >
                        <Form.Item label="用户编码">
                            {getFieldDecorator('userCode', {
                                initialValue: editFlag === 'edit' ? user.userCode:null,
                                rules: [{ required: true, message: '用户编码必输' }],
                            })(<Input/>)}
                        </Form.Item>
                    </Row>

                    <Row >
                        <Form.Item label="密码">
                            <Input value={user.password} disabled/>
                        </Form.Item>
                    </Row>

                    <Row >
                        <Form.Item label="邮箱">
                            {getFieldDecorator('email', {
                                initialValue: editFlag === 'edit' ? user.email:null,
                                rules: [{ required: true, message: '邮箱必输' }],
                            })(<Input/>)}
                        </Form.Item>
                    </Row>
                    <Row >
                        <Form.Item label="电话号码">
                            {getFieldDecorator('phoneNumber', {
                                initialValue: editFlag === 'edit' ? user.phoneNumber:null,
                                rules: [{ required: true, message: '电话号码必输' }],
                            })(<Input/>)}
                        </Form.Item>
                    </Row>
                    <Row >
                        <Form.Item label="角色">

                            {getFieldDecorator('role', {
                                initialValue: editFlag === 'edit' ? user.role.map(item =>{ return item.id}):undefined,
                                rules: [{ required: true, message: '角色必输' }],
                            })(
                                <Select style={{ width: '100%' }} mode="multiple" placeholder="请选择角色">
                                    {
                                        roles.map((item,index)=>{
                                            return (
                                                <Option key={index} value={item.id}>
                                                    {item.roleName}
                                                </Option>
                                            )
                                        })
                                    }
                                </Select>
                            )}
                        </Form.Item>
                    </Row>

                </Form>

                <div
                    style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: '#fff',
                        textAlign: 'right',
                    }}
                >
                    <Button style={{ marginRight: 8 }}>
                        取消
                    </Button>
                    <Button  onClick={this.updateUser} type="primary">
                        保存
                    </Button>
                </div>
            </div>
        );
    }
}


export default Form.create()(EditDrawer);
