import React, {Component} from 'react';
import EditDrawer from "./edit_drawer";
import "./menu.less";
import menuList from "../../utils/menuConfig";
import exportExcel from '../../utils/excelUtiils'
import {
    Button, Col,
    Card, Tag, Drawer,
    Form, Icon, Badge,
    Input, Table, Divider, Row, message
} from 'antd';

/*
    更新分类from组件
 */

class Menu extends Component{

    constructor(props){
        super(props);
        this.state = {
            data: menuList,
            menu:{},
            editFlag: null,//区分保存还是编辑
            visible: false,
        };
    }



    //打开抽屉
    showDrawer = (flag) => {
        this.setState({
            visible: true,
            editFlag:flag
        });
    };

    //关闭抽屉
    onClose = () => {
        this.setState({
            visible: false,
            editFlag: null
        });
    };

    onRow = (menu) =>{
        return {
            onClick :() =>{//点击行
                this.setState({menu});
            }
        }
    };

    //导出
    menuExportExcel = () =>{
        const hide = message.loading('正在导出中..', 0);
        exportExcel(this.columns, this.state.data, '菜单表.xlsx');
        setTimeout(hide, 2500);
    };


    //初始化table的里列名数组
    initColums = () => {
        this.columns = [
            {
                title: '目录/菜单',
                dataIndex: 'title',
                key: 'name',
                width:250,
            },
            {
                title: '上级目录',
                dataIndex: 'parentTitle',
                key: 'parentTitle',
            },
            {
                title: '编码',
                dataIndex: 'code',
                key: 'code',
            },
            {
                title: '图标',
                dataIndex: 'menuIcon',
                key: 'menuIcon',
                render: (text, record) => (
                    <span>
                        <Icon type={record.icon} theme="twoTone" twoToneColor={record.color} />
                    </span>
                )
            },
            {
                title: '标记',
                dataIndex: 'tag',
                key: 'tag',
                render : (text, record) =>(
                    <span>
                        <Tag color={ record.tag ==='层级层'? 'blue': 'green'}>
                            {record.tag}
                        </Tag>
                     </span>
                )
            },
            {
                title: '序号',
                dataIndex: 'index',
                key: 'index',
                render : (text, record) =>(
                    <span>
                         {record.index}
                     </span>
                )
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render : () =>(
                    <span>
                        <Badge status="success" text="启用" />
                    </span>
                )
            },
            {
                title: '操作',
                width: 300,
                dataIndex: 'action',
                key: 'action',
                render: (text, record) => (
                    <span>
                        {
                            record.tag === '层级层' ? <Button type="link" onClick={() => {this.showDrawer('add')}}>新建</Button> :null
                        }
                        {
                            record.tag === '层级层' ? <Divider type="vertical" /> :null
                        }
                        <Button type="link" onClick={() => {this.showDrawer('edit')}}>编辑</Button>
                    </span>
                )
            },

        ];
    };

    //进入render()发前 一次处理(同步)
    componentWillMount() {
        this.initColums();
    }

    render(){
        const { getFieldDecorator } = this.props.form;

        const {data, visible, menu, editFlag} = this.state;

        const title = (
            <Form layout="inline" onSubmit={this.handleSubmit}>
                <Row gutter={24}>
                    <Col span={6}>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="目录/菜单:">
                            {getFieldDecorator('username')(
                                <Input/>,
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>

                        <Form.Item label="上级目录:">
                            {getFieldDecorator('password')(
                                <Input/>,
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item>
                            <Button htmlType="submit">
                                重置
                            </Button> &nbsp;&nbsp;
                            <Button type="primary" htmlType="submit">
                                查询
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>

        );

        return (
            <div className='menu'>
                <Card className='menu_card header_style'>
                     <span>
                         <Button type="link" icon="plus" size='small'  onClick={() => this.showDrawer('new')}>新建</Button>
                         <Button type="link" icon="cloud-download" size='small' onClick={this.menuExportExcel}>导出</Button>
                     </span>
                     <span style={{float:'right'}}>
                         <Button type="link" icon="up" size='small' >全部展开</Button>
                         <Button type="link" icon="down" size='small'>全部收起</Button>
                     </span>
                </Card>
                <Card  style={{width: "100%"}} title={title}>

                    <Table
                        columns={this.columns}
                        bordered
                        size='middle'
                        dataSource={data}
                        onRow = {this.onRow}
                    />,

                    {/*新建按钮*/}
                    <Drawer
                        title="创建目录"
                        width={600}
                        onClose={this.onClose}
                        visible={visible}
                        bodyStyle={{ paddingBottom: 80 }}
                        destroyOnClose ={true}
                    >
                        <EditDrawer
                            menu = {menu}
                            editFlag = {editFlag}
                            onClose={this.onClose.bind(this)}
                        >
                        </EditDrawer>
                    </Drawer>
                </Card>
            </div>
        )
    }
}


export default Form.create()(Menu);
