import React, {Component} from 'react';
import {Form, Button, Row, Input, Select, InputNumber, Icon, Tag, Badge, Col} from 'antd';
import PropTypes from "prop-types";
import {icons, colors, status} from "../../utils/constants";
import {reqlogin, updateMenu} from "../../api/index";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";

const { Option } = Select;
/*
    添加分类from组件
 */

class EditDrawer extends Component{

    static propTypes ={
        parentTitles : PropTypes.array,
        menu: PropTypes.object,
        editFlag: PropTypes.string
    };

    constructor (props){
        super(props);

        this.state = {
            icons:icons,
            colors:colors,
            status:status
        };

    }


    //更新角色权限
    updateMenu = () =>{

        //await 使用 需要在当前方法左边添加 async
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                //关闭窗口
                this.props.onClose();
                console.log(values);

                //请求提交方法
                const response = await updateMenu(values);
            }
        });


    };


    render(){

        const { menu, editFlag} = this.props;

        const { getFieldDecorator } = this.props.form;

        const {icons, colors, status} = this.state;

        const layout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
        };


        return (
            <div>
                <Form {...layout} hideRequiredMark >
                    <Row >
                        <Form.Item label="目录名称">
                            {getFieldDecorator('title', {
                                initialValue: editFlag === 'edit' ? menu.title:null,
                                rules: [{ required: true, message: '目录名称必输' }],
                            })(<Input/>)}
                        </Form.Item>
                    </Row>
                    <Row >
                        <Form.Item label="目录编码">
                            {getFieldDecorator('code', {
                                initialValue: editFlag === 'edit' ? menu.code:null,
                                rules: [{ required: true, message: '目录编码必输' }],
                            })(
                                <Input placeholder="格式为英文大写" />
                            )}
                        </Form.Item>
                    </Row>

                    {
                        editFlag != 'new'?  <Row >
                            <Form.Item label="上级目录">
                                {getFieldDecorator('parentTitle', {
                                    initialValue: editFlag === 'add' ? menu.title: menu.parentTitle
                                })(<Input disabled/>)}
                            </Form.Item>
                        </Row>: null
                    }
                    <Row >
                        <Form.Item label="路由">
                            {getFieldDecorator('key', {
                                initialValue: editFlag === 'edit' ? menu.key:null
                            })(<Input />)}
                        </Form.Item>
                    </Row>
                    <Row gutter={16}>
                        <Col span={8} offset={4}>
                            <Form.Item label="图标">
                                {getFieldDecorator('icon', {
                                    initialValue: editFlag === 'edit' ? menu.icon:null
                                })(
                                    <Select style={{ width: 80 }} >
                                        {
                                            icons.map((item,index)=>{
                                                return (
                                                    <Option key={index} value={item} >
                                                        <Icon type={item} />
                                                    </Option>
                                                )
                                            })
                                        }
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item>
                                {getFieldDecorator('color', {
                                    initialValue: editFlag === 'edit' ? menu.color:null
                                })(
                                    <Select style={{ width: 100 }} >
                                        {
                                            colors.map((item,index)=>{
                                                return (
                                                    <Option key={index} value={item}>
                                                    <span style={{backgroundColor:item,color:'#ffffff',
                                                        width:'20px', height:'20px'}}>{item}</span>
                                                    </Option>
                                                )
                                            })
                                        }
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row >
                        <Form.Item label="标记">
                            {getFieldDecorator('tag')(
                                editFlag != 'edit'
                                    ?<Tag color={ null == menu.title ? 'blue': 'green'}>{ null == menu.title ? '层级层': '菜单层'}</Tag>
                                    :<Tag color={ '层级层' === menu.tag ? 'blue': 'green'}>{menu.tag}</Tag>
                            )}
                        </Form.Item>
                    </Row>
                    <Row >
                        <Form.Item label="序号">
                            {getFieldDecorator('index', {initialValue: editFlag === 'edit' ? menu.index: 0})(
                                <InputNumber min={0} max={100}/>
                            )}
                        </Form.Item>
                    </Row>
                    <Row >
                        <Form.Item label="状态">

                            {getFieldDecorator('status', {
                                initialValue:  editFlag === 'edit' ? menu.status:'success'
                            })(
                                <Select style={{ width: 100 }} >
                                    {
                                        status.map((item,index)=>{
                                            return (
                                                <Option key={index} value={item.code} >
                                                    <Badge status={item.code} text={item.message} />
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
                    <Button  onClick={this.updateMenu} type="primary">
                        保存
                    </Button>
                </div>
            </div>
        );
    }
}


export default Form.create()(EditDrawer);
