import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Form,
    Select,
    Input
} from 'antd';

const Item = Form.Item;
const Option = Select.Option;
/*
    添加分类from组件
 */

class AddForm extends Component{

    static propTypes = {
        categorys: PropTypes.array.isRequired,//一级分类数组
        parentId: PropTypes.string.isRequired, //父级分类ID
        setForm: PropTypes.func.isRequired
    };

    componentWillMount(){
        this.props.setForm(this.props.form);
    }

    render(){


        const {categorys, parentId} = this.props;

        const { getFieldDecorator } = this.props.form;

        return (
            <Form>
                <Item>
                    {
                        getFieldDecorator('parentId',{
                            initialValue:parentId
                        })(
                            <Select>
                                <Option value='0'>一级分类</Option>
                                {
                                    categorys.map(
                                        (c,index) => <Option key={index} value={c.categoryLineId}>{c.categoryTypeName}</Option>
                                    )
                                }
                            </Select>
                        )
                    }

                </Item>

                <Item>
                    {
                        getFieldDecorator('categoryTypeName',{
                            initialValue:''
                        })(
                            <Input placeholder='请输入分类名称'/>
                        )
                    }

                </Item>
            </Form>
        )
    }
}


export default Form.create()(AddForm);
