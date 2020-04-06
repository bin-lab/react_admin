import React, {Component} from 'react';
import {Form, Button, Tree, Row, Input, notification} from 'antd';
import PropTypes from "prop-types";
import menuList from "../../utils/menuConfig";
import {updateAuthRole} from '../../api/index'

const { TreeNode } = Tree;
/*
    添加分类from组件
 */

class authDrawer extends Component{


    static propTypes ={
        role : PropTypes.object
    };


    constructor (props){
        super(props);

        //根据传入的角色的menus生成初始化状态
        const {menus} = this.props.role;
        this.state = {
            checkedKeys :menus
        };

    }

    //选中某个node时的回调
     onCheck = checkedKeys => {
        console.log('onCheck', checkedKeys);
        this.setState({checkedKeys});
    };

    //更新角色权限
    updateRole = async () =>{
        //关闭窗口
        this.props.authClose();
        const role = this.props.role;
        role.menus = this.state.checkedKeys;

        //请求提交方法
        const response = await updateAuthRole(role);
        //请求完成后处理返回的数据状态
        const result = response.data;
        console.log(result);
        if (result.success === true) {
            notification.success({
                message: '提醒',
                description:'角色权限更新成功',
                placement:'bottomRight'
            });

        }

    };

    //初始化循环遍历菜单集合
    getTreeNodes = (menuList) =>{
        return menuList.reduce((pre, item) =>{
            pre.push(
                <TreeNode title={item.title} key={item.key}>
                    {item.children ? this.getTreeNodes(item.children): null}
                </TreeNode>
            );
            return pre
        }, [])
    };

    componentWillMount(){
        this.treeNodes = this.getTreeNodes(menuList);
    }

    /**
     * 当组件接收到新的属性时自动调用
     */

    // componentWillReceiveProps (nextProps) {
    //     const menus = nextProps.role.menus;
    //     this.setState({
    //         checkedKeys: menus
    //     })
    //
    // }

    render(){

        const {role} = this.props;

        const {checkedKeys} = this.state;

        const layout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
        };


        return (
            <div>
                <Row >
                    <Form.Item label="角色名称" {...layout}>
                        <Input value={role.roleName} disabled/>
                    </Form.Item>
                </Row>

                <Row>
                    <Form.Item label="权限列表" {...layout}>
                        <Tree
                            checkable
                            defaultExpandAll={true}
                            checkedKeys={checkedKeys}
                            onCheck={this.onCheck}
                        >
                            <TreeNode title="平台权限" key="all">
                                {this.treeNodes}
                            </TreeNode>
                        </Tree>
                    </Form.Item>
                </Row>


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
                    <Button onClick={this.props.authClose} style={{ marginRight: 8 }}>
                        取消
                    </Button>
                    <Button onClick={this.updateRole} type="primary" htmlType="submit">
                        保存
                    </Button>
                </div>
            </div>
        );
    }
}

export default authDrawer;
