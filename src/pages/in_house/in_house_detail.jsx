import React, {Component} from 'react';
import {
    Card,
    Button,
    Form,
    Tooltip,
    Row,
    Col,
    Input,
    Table,
    message,
    Steps,
    Icon} from 'antd';
import "./in_house.less";
import {reqCategorys} from "../../api";
/*
    入库管理路由
 */

class InHouseDetail extends Component{


    //初始化table的里列名数组
    initColums = () =>{
        this.columns = [
            {
                title: '商品类别标识',
                dataIndex: 'categoryLineId',
            },
            {
                title: '商品类别名称',
                dataIndex: 'categoryTypeName',
            },
            {
                title: '商品类别编号',
                dataIndex: 'categoryTypeNum',
            }
        ];
    };

    //进入render()发前 一次处理
    componentWillMount(){
        this.initColums();
    }



    state = {
        loading: false,//是否正在获取数据中
        categorys:[],//一级分类列表
    };


    //异步获取一类分类数据
    getCategorys = async ()=>{

        //再发请求前，显示loading
        this.setState({loading: true});
        //获取数据
        const result = await reqCategorys('0');

        //请求后隐藏loading
        this.setState({loading: false});

        if (result.status) {
            const categorys = result.data;

            //更新状态

            this.setState({categorys});
        } else {
            //错误
            message.error('获取分类列表数据失败');
        }
    };


    //异步ajax请求
    componentDidMount(){
        this.getCategorys();
    }


    render(){
        //读取状态数据
        const {loading, categorys} = this.state;

        const { getFieldDecorator } = this.props.form;

        const { Step } = Steps;


        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
                name: record.name,
            }),
        };

        return (
            <div className='in_house_detail'>

                <Card className='in_house_card header_style'>
                    <div className='in_house_card_button'>
                        <Button type="link" icon="save" size='small' className='button-style'>保存</Button>
                        <Button type="link" icon="check" size='small' className='button-style'>校验</Button>
                    </div>
                </Card>

                <Card size="small" title={<span><Icon type="edit" theme="twoTone" /> &nbsp;&nbsp; 基础信息</span>}  className='in_house_card'>
                    <Form className="in_house_form" layout="inline" >
                        <Row>
                            <Col span={8}>
                                <Form.Item label="入库单编号" className='in_house_form_item'>
                                    {getFieldDecorator('number', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input your E-mail!',
                                            }
                                        ],
                                    })( <Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="入库单编号" className='in_house_form_item'>
                                    {getFieldDecorator('number', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input your E-mail!',
                                            }
                                        ],
                                    })( <Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="入库单编号" className='in_house_form_item'>
                                    {getFieldDecorator('number', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input your E-mail!',
                                            }
                                        ],
                                    })( <Input/>)}
                                </Form.Item>
                            </Col>
                        </Row>


                        <Row>
                            <Col span={8}>
                                <Form.Item label="入库单编号" className='in_house_form_item'>
                                    {getFieldDecorator('number', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input your E-mail!',
                                            }
                                        ],
                                    })( <Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="入库单编号" className='in_house_form_item'>
                                    {getFieldDecorator('number', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input your E-mail!',
                                            }
                                        ],
                                    })( <Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="入库单编号" className='in_house_form_item'>
                                    {getFieldDecorator('number', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input your E-mail!',
                                            }
                                        ],
                                    })( <Input/>)}
                                </Form.Item>
                            </Col>
                        </Row>

                    </Form>
                </Card>

                <Card size="small" title={<span><Icon type="edit" theme="twoTone" /> &nbsp;&nbsp; 入库物流服务</span>}  className='in_house_card'>
                    <Form className="in_house_form" layout="inline" >
                        <Row>
                            <Col span={8}>
                                <Form.Item label="入库单编号" className='in_house_form_item'>
                                    {getFieldDecorator('number', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input your E-mail!',
                                            }
                                        ],
                                    })( <Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="入库单编号" className='in_house_form_item'>
                                    {getFieldDecorator('number', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input your E-mail!',
                                            }
                                        ],
                                    })( <Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="入库单编号" className='in_house_form_item'>
                                    {getFieldDecorator('number', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input your E-mail!',
                                            }
                                        ],
                                    })( <Input/>)}
                                </Form.Item>
                            </Col>
                        </Row>


                        <Row>
                            <Col span={8}>
                                <Form.Item label="入库单编号" className='in_house_form_item'>
                                    {getFieldDecorator('number', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input your E-mail!',
                                            }
                                        ],
                                    })( <Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="入库单编号" className='in_house_form_item'>
                                    {getFieldDecorator('number', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input your E-mail!',
                                            }
                                        ],
                                    })( <Input/>)}
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item label="入库单编号" className='in_house_form_item'>
                                    {getFieldDecorator('number', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input your E-mail!',
                                            }
                                        ],
                                    })( <Input/>)}
                                </Form.Item>
                            </Col>
                        </Row>

                    </Form>
                    <div>
                        <Card type="inner" title="海外转运物流服务" extra={<a href="#">详情</a>} className='in_house_card_inner'>
                            <Steps>
                                <Step status="finish" title="Login" icon={<Icon type="user" />} />
                                <Step status="finish" title="Verification" icon={<Icon type="solution" />} />
                                <Step status="process" title="Pay" icon={<Icon type="loading" />} />
                                <Step status="wait" title="Done" icon={<Icon type="smile-o" />} />
                            </Steps>
                        </Card>
                    </div>

                    <div>
                        <Card type="inner" title="国内物流服务" extra={<a href="#">详情</a>} className='in_house_card_inner'>
                            <Steps>
                                <Step status="finish" title="Login" icon={<Icon type="user" />} />
                                <Step status="finish" title="Verification" icon={<Icon type="solution" />} />
                                <Step status="process" title="Pay" icon={<Icon type="loading" />} />
                                <Step status="wait" title="Done" icon={<Icon type="smile-o" />} />
                            </Steps>
                        </Card>
                    </div>




                </Card>

                <Card size="small"
                      title={<span><Icon type="edit" theme="twoTone" /> &nbsp;&nbsp; 入库商品详情</span>}
                      extra={
                          <div>
                              <Tooltip placement="bottom" title='新建'>
                                  <Button type="link" icon="plus" size='small' className='button-style'/>
                              </Tooltip>
                              <Tooltip placement="bottom" title='删除'>
                                  <Button type="link" icon="minus" size='small' className='button-style'/>
                              </Tooltip>
                              <Tooltip placement="bottom" title='刷新'>
                                  <Button type="link" icon="reload" size='small' className='button-style'/>
                              </Tooltip>
                          </div>
                      }
                      className='in_house_card'>


                    <Table
                        rowSelection = {rowSelection}
                        bordered
                        loading={loading}
                        dataSource={categorys}
                        columns={this.columns}
                        rowKey='categoryLineId'
                        pagination={{defaultPageSize:5}}
                        size = 'middle'
                    />

                </Card>
            </div>
        )
    }
}


//包装Form组件生成新的组件
const WrapInHouseDetail = Form.create()(InHouseDetail);
export default WrapInHouseDetail;
