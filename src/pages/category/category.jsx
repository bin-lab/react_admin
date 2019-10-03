import React, {Component} from 'react';
import {Card,Breadcrumb,Icon,Button,Table,message } from "antd";
import {reqCategorys} from "../../api";
/*
    商品分类路由
 */

export default class Category extends Component{

    //初始化table的里列名数组
    initColums = () =>{
        this.columns = [
            {
                title: '类别名称',
                dataIndex: 'categoryTypeName',
            },
            {
                title: '操作',
                width:300,
                dataIndex: '',
                render:()=> (
                    <span>
                        <Button type="link">更新操作</Button>
                        <Button type="link">查看子分类</Button>
                    </span>
                )
            },
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

        const title = (
            <Breadcrumb>
               <Breadcrumb.Item>一级菜单</Breadcrumb.Item>
            </Breadcrumb>
        );

        const extra = (
            <Button type="primary">
                <Icon type="plus" />
                添加
            </Button>
        );


        return (
            <div>
                <Card title={title} extra={extra} style={{ width: "100%" }}>
                    <Table
                        bordered
                        loading={loading}
                        dataSource={categorys}
                        columns={this.columns}
                        rowKey='categoryLineId'
                        pagination={{defaultPageSize:5, showQuickJumper:true}}
                    />
                </Card>
            </div>
        )
    }
}
