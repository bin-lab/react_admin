import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Form,
    Input
} from 'antd';

const Item = Form.Item;
/*
    更新分类from组件
 */

class UpdateForm extends Component{

    static propTypes = {
        categoryTypeName: PropTypes.string.isRequired,
        setForm: PropTypes.func.isRequired
    };

    //调用render()前操作
    componentWillMount(){
        this.props.setForm(this.props.form)
    }

    render(){
        const {categoryTypeName} = this.props;

        const {getFieldDecorator} = this.props.form;

        return (
            <Form>
                <Item>
                    {
                        getFieldDecorator('categoryTypeName',{
                            initialValue: categoryTypeName
                        })(
                            <Input placeholder='请输入分类名称'/>
                        )
                    }

                </Item>
            </Form>
        )
    }
}


export default Form.create()(UpdateForm);
