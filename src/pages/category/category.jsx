import React, {Component} from 'react';
import {
    Card,
    Breadcrumb,
    Icon,
    Button,
    Table,
    message,
    Modal,
    notification
} from "antd";
import {reqCategorys, reqUpdateCategory, reqAddCategory} from "../../api";
import AddForm from "./add_form";
import UpdateForm from "./update_form";
/*
    商品分类路由
 */

export default class Category extends Component {


    state = {
        loading: false,//是否正在获取数据中
        categorys: [],//一级分类列表
        subCategorys: [],//子分类数据
        parentId: '0',//父级列表的parentId
        parentName: '',//分类名称
        showStatus: 0,//标识添加/更新的确认框是否显示 0:都不显示， 1：显示添加, 2:更新操作
    };

    //初始化table的里列名数组
    initColums = () => {
        this.columns = [
            {
                title: '类别名称',
                dataIndex: 'categoryTypeName',
            },
            {
                title: '操作',
                width: 300,
                dataIndex: '',
                render: (category) => (
                    <span>
                        <Button type="link" onClick={() => {
                            this.updateShow(category)
                        }}>更新操作</Button>
                        {
                            this.state.parentId === '0' ?
                                <Button type="link" onClick={() => {
                                    this.showSubCategorys(category)
                                }}>查看子分类</Button> : null}
                    </span>
                )
            },
        ];
    };

    //异步获取一级/二级分类数据
    getCategorys = async () => {

        //再发请求前，显示loading
        this.setState({loading: true});

        const {parentId} = this.state;
        //获取数据
        const result = await reqCategorys(parentId);

        //请求后隐藏loading
        this.setState({loading: false});

        if (result.status) {
            const categorys = result.data;

            //更新一级/二级分类状态
            if (parentId === '0') {
                this.setState({
                    categorys: categorys
                })
            } else {
                this.setState({
                    subCategorys: categorys
                });
            }

        } else {
            // notification.warning({
            //     message: '操作提示',
            //     description:
            //         '获取分类列表数据失败',
            //     placement: 'bottomRight'
            // });
        }
    };

    //显示指定一级分类对象的二级列表
    showSubCategorys = (category) => {
        //更新状态 注意 这个是异步请求
        this.setState({
            parentId: category.categoryLineId,
            parentName: category.categoryTypeName
        }, () => {
            //回调方法内调用函数
            this.getCategorys();
        })
    };

    //显示一级列表数据
    showCategorys = () => {

        this.setState({
            parentId: '0',
            parentName: '',
            subCategorys: []
        })
    };


    //响应点击取消:隐藏确认框
    handleCancel = () => {
        //清楚输入数据（重置操作）
        this.form.resetFields();
        //隐藏
        this.setState({
            showStatus: 0
        })
    };

    //显示添加方法
    addShow = () => {
        this.setState({
            showStatus: 1
        })
    };


    //添加分类
    addCategory = () => {

    };

    //显示更新方法
    updateShow = (category) => {
        //保存分类对象
        this.category = category;
        this.setState({
            showStatus: 2
        })
    };


    /*
        更新分类
        1.关闭窗口
        2.发送请求
        3.更新界面数据
    */
    updateCategory = async () => {
        //隐藏窗口
        this.setState({
            showStatus: 0
        });

        //发送请求，保存更新

        const categoryLineId = this.category.categoryLineId;
        const categoryTypeName = this.form.getFieldValue('categoryTypeName');

        //清除输入数据（重置操作）
        this.form.resetFields();

        //获取参数(categoryLineId,categoryTypeName)
        const result = await reqUpdateCategory({categoryLineId, categoryTypeName});

        if (result.status) {
            //重新显示
            this.getCategorys();
        }

    };

    //异步请求
    componentDidMount() {
        this.getCategorys();
    }


    //进入render()发前 一次处理(同步)
    componentWillMount() {
        this.initColums();
    }

    render() {
        //读取状态数据
        const {loading, categorys, parentId, subCategorys, parentName, showStatus} = this.state;

        //读取分类对象
        const category = this.category || {};

        const title = parentId === '0' ?
            (<Breadcrumb>
                <Breadcrumb.Item>一级菜单</Breadcrumb.Item>
            </Breadcrumb>) :
            (<Breadcrumb>
                <Breadcrumb.Item>
                    <Button type="link" onClick={this.showCategorys}>一级菜单</Button>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{parentName}</Breadcrumb.Item>
            </Breadcrumb>);

        const extra = (
            <Button type="primary" onClick={() => {
                this.addShow()
            }}>
                <Icon type="plus"/>
                添加
            </Button>
        );


        return (
            <div>
                <Card title={title} extra={extra} style={{width: "100%"}}>
                    <Table
                        bordered
                        loading={loading}
                        dataSource={parentId === '0' ? categorys : subCategorys}
                        columns={this.columns}
                        rowKey='categoryLineId'
                        pagination={{defaultPageSize: 5, showQuickJumper: true}}
                    />


                    {/*新增按钮*/}
                    <Modal
                        title="添加分类"
                        visible={showStatus === 1}
                        onOk={this.addCategory}
                        onCancel={this.handleCancel}
                    >
                        <AddForm
                            categorys={categorys}
                            parentId={parentId}
                            setForm={(form) => {this.form = form}}
                        />
                    </Modal>


                    {/*更新按钮*/}
                    <Modal
                        title="更新分类"
                        visible={showStatus === 2}
                        onOk={this.updateCategory}
                        onCancel={this.handleCancel}
                    >
                        <UpdateForm
                            categoryTypeName={category.categoryTypeName}
                            setForm={(form) => {this.form = form}}
                        />

                    </Modal>
                </Card>
            </div>
        )
    }
}
