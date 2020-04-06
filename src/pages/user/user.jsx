import React, {Component} from 'react';
import {Button, Card, Divider, Drawer, Table, Tag} from "antd";
import {PAGE_SIZE} from "../../utils/constants";
import EditDrawer from "./edit_user";
import './user.less';


/*
    用户路由
 */

export default class User extends Component{


    constructor (props) {
        super(props);

        this.state ={
            users:[
                {
                    "id":123456,
                    "userName":"用户1",
                    "userCode":"user_1",
                    "email":"4654646565@qq.com",
                    "phoneNumber":12365478912,
                    "createDate": "2020-03-29",
                    "role":[
                        {
                            "roleName":'角色1',
                            "id":123456,
                        },
                        {
                            "roleName":'角色2',
                            "id":254163,
                        },
                    ],
                },
                {
                    "id":323456,
                    "userName":"用户2",
                    "userCode":"user_2",
                    "email":"4654646565@qq.com",
                    "phoneNumber":17369478912,
                    "createDate": "2020-03-29",
                    "role":[
                        {
                            "roleName":'角色1',
                            "id":123456,
                        },
                    ],
                },
                {
                    "id":135456,
                    "userName":"用户3",
                    "userCode":"user_3",
                    "email":"4654646565@qq.com",
                    "phoneNumber":14365478912,
                    "createDate": "2020-03-29",
                    "role":[
                        {
                            "roleName":'角色2',
                            "id":254163,
                        },
                    ],
                }
            ], //所有用户列表
            user: {},
            visible: false,
            editFlag: null
        };
    }


    //打开抽屉
    showDrawer = (flag) => {
        this.setState({
            visible: true,
            editFlag: flag
        });
    };

    //关闭抽屉
    onClose = () => {
        this.setState({
            visible: false,
            editFlag: null
        });
    };

    onRow = (user) =>{
        return {
            onClick :() =>{//点击行
                this.setState({user});
            }
        }
    };

    initColumn = () =>{
        this.columns =[
            {title:'用户名',dataIndex: 'userName', key:''},
            {title:'邮箱',dataIndex: 'email', key:'email'},
            {title:'电话号码',dataIndex: 'phoneNumber', key:'phoneNumber'},
            {title:'创建时间',dataIndex: 'createDate', key:'createDate'},
            {
                title:'角色',
                dataIndex: 'role',
                key:'role',
                //由于是数组不能直接渲染
                render(arr) {
                    return arr.map(item =>{
                        return <Tag color='blue' key={item.id}>{item.roleName}</Tag>;
                    })
                }
            },
            {
                title: '操作',
                dataIndex: 'action',
                width:300,
                render: (text, record) => (
                    <span>
                        <Button type="link" onClick={() => {this.showDrawer('edit')}}>编辑</Button>
                        <Divider type="vertical" />
                        <Button type="link">删除</Button>
                  </span>
                )
            },
        ]
    };


    componentWillMount (){
        this.initColumn();
    };

    render(){

        const {users, visible, editFlag, user} = this.state;

        return (
            <div className='user'>
                <Card className='user_card header_style'>
                     <span>
                         <Button type="link" icon="plus" size='small' onClick={() => {this.showDrawer('add')}}>新建</Button>
                         <Button type="link" icon="cloud-download" size='small'>导出</Button>
                     </span>
                </Card>
                <Card>
                    <Table
                        bordered
                        rowkey='id'
                        dataSource={users}
                        columns={this.columns}
                        pageination={{defaultPageSize:PAGE_SIZE}}
                        size = 'middle'
                        onRow = {this.onRow}
                    />

                    {/*编辑用户*/}
                    <Drawer
                        title={editFlag === 'add' ? "新增用户": "编辑用户"}
                        width={600}
                        onClose={this.onClose}
                        visible={visible}
                        bodyStyle={{ paddingBottom: 80 }}
                        destroyOnClose ={true}
                    >

                        <EditDrawer
                            editFlag = {editFlag}
                            user = {user}
                            onClose={this.onClose.bind(this)}
                        >
                        </EditDrawer>
                    </Drawer>

                </Card>
            </div>
        )
    }
}
