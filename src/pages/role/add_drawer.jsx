import React, {Component} from 'react';
import {Form, Button, Row, Input, notification} from 'antd';
import PropTypes from 'prop-types';
import {reqAddRole} from '../../api/index'
/*
    添加分类from组件
 */

class AddDrawer extends Component{

    static propTypes ={
        setForm: PropTypes.func.isRequired
    };


    constructor(props){
        super(props);

        this.state ={
            roleName:''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //提交方法
    handleSubmit = (event) => {
        //阻止事件的默认提交功能额
        event.preventDefault();

        //await 使用 需要在当前方法左边添加 async
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                //关闭窗口
                this.props.addClose();
                //请求的参数
                this.state = values;

                //请求提交方法
                const response = await reqAddRole(this.state);

                //请求完成后处理返回的数据状态
                const result = response.data;
                console.log(result);
                if (result.success === true) {
                    console.log(response);
                    notification.success({
                        message: '提醒',
                        description:'保存成功',
                        placement:'bottomRight'
                    });
                    //刷新角色列表
                    this.getRoles();

                }

            }
        });
    };

    componentWillMount(){
        this.props.setForm(this.props.form);
    }


    render(){

        const { getFieldDecorator } = this.props.form;

        const layout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
        };


        return (
            <div>
                <Form {...layout} hideRequiredMark>
                    <Row >
                        <Form.Item label="角色名称">
                            {getFieldDecorator('roleName', {
                                rules: [{ required: true, message: '角色名称必须输入' }],
                            })(<Input placeholder="请输入角色名称" />)}
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
                    <Button onClick={this.props.addClose} style={{ marginRight: 8 }}>
                        取消
                    </Button>
                    <Button onClick={this.handleSubmit} type="primary" htmlType="submit">
                        保存
                    </Button>
                </div>
            </div>
        );
    }
}


export default Form.create()(AddDrawer);
