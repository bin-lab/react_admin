import React, {Component} from 'react';
import {Card, Button, message , Table, Drawer, Icon, Modal, Divider} from 'antd'
import {PAGE_SIZE} from "../../utils/constants";
import {reqRoles} from '../../api/index'
import AddDrawer from "./add_drawer";
import AuthDrawer from "./auth_drawer";
import "./role.less";
import exportExcel from '../../utils/excelUtiils'

const { confirm } = Modal;
/*
    角色路由
 */

export default class Role extends Component{

    constructor (props) {
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
            role:{}, //选中列表对象
            isShowAdd: false,//是否显示添加界面
            isAuthShowAdd:false//是否显示添加权限界面
        };
    }



    //关闭抽屉
    addClose = () => {
        this.setState({
            isShowAdd: false,
        });
    };


    authClose = () => {
        this.setState({
            isAuthShowAdd: false,
        });
    };

    //删除操作
    handleDelete = key => {
        const dataSource = [...this.state.dataSource];

    };
    handleDelete = (id) =>{
        const roles = [...this.state.roles];
        confirm({
            title: '提醒',
            icon: <Icon type='question-circle' theme="twoTone" twoToneColor='#fb6340'/>,
            content: '你想删除这条记录吗?',
            okText:'确定',
            cancelText:'取消',
            onOk() {
                console.log(id);
            },
            onCancel() {},
        });
    };


    initColumn = () =>{
      this.columns =[
          {title:'角色名称',dataIndex: 'roleName', key:'roleName'},
          {title:'角色编码',dataIndex: 'roleCode', key:'roleCode'},
          {title:'创建时间',dataIndex: 'createTime', key:'createTime'},
          {title:'授权时间',dataIndex: 'authTime', key:'authTime'},
          {title:'授权人',dataIndex: 'authUserName', key:'authUserName'},
          {
              title: '操作',
              dataIndex: 'action',
              key:'action',
              width:300,
              render: (text, record) => (
                  <span>
                        <Button type="link" onClick={()=>this.setState({isAuthShowAdd:true})}>添加角色权限</Button>
                        <Divider type="vertical" />
                        <Button type="link" onClick={() => this.handleDelete(record.id)}>删除</Button>
                  </span>
              )
          },
      ]};




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

    onRow = (role) =>{
        return {
            onClick :() =>{//点击行
                this.setState({role});
            }
        }
    };

    roleExportExcel = () =>{
        const hide = message.loading('正在导出中..', 0);
        exportExcel(this.columns, this.state.roles, '角色表.xlsx');
        setTimeout(hide, 2500);
    };



    componentWillMount (){
      this.initColumn();
    };

    componentDidMount (){
        //this.getRoles();
    };

    render(){

        const {roles, role, isShowAdd, isAuthShowAdd} = this.state;

        return (
            <div className='role'>
                <Card className='role_card header_style'>
                     <span>
                         <Button type="link" icon="plus" size='small' onClick={()=>this.setState({isShowAdd:true})}>新建</Button>
                         <Button type="link" icon="cloud-download" size='small' onClick={this.roleExportExcel}>导出</Button>
                     </span>
                </Card>
                <Card>
                    <Table
                        bordered
                        rowkey='id'
                        dataSource={roles}
                        columns={this.columns}
                        pageination={{defaultPageSize:PAGE_SIZE}}
                        onRow = {this.onRow}
                        size = 'middle'
                    />

                    {/*创建角色*/}
                    <Drawer
                        title="创建角色"
                        width={600}
                        onClose={this.addClose}
                        visible={isShowAdd}
                        bodyStyle={{ paddingBottom: 80 }}
                    >
                        <AddDrawer
                            addClose={this.addClose.bind(this)}
                            setForm={(form)=> this.form =form}>
                        </AddDrawer>
                    </Drawer>
                    {/*创建角色权限*/}
                    <Drawer
                        title="创建角色权限"
                        width={600}
                        onClose={this.authClose}
                        visible={isAuthShowAdd}
                        bodyStyle={{ paddingBottom: 80 }}
                        destroyOnClose ={true}
                    >
                        <AuthDrawer
                            authClose={this.authClose.bind(this)}
                            role = {role}>
                        </AuthDrawer>
                    </Drawer>
                </Card>
            </div>

        )
    }
}
