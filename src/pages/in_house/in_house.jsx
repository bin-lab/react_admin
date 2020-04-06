import React, {Component} from 'react';
import {
    Button,
    Card,
    Col,
    Input,
    Table,
    Form,
    Row} from 'antd';
import {reqwest} from "../../api";
/*
    出库管理路由
 */

const columns = [
    {
        title: '操作',
        width:300,
        dataIndex: 'cell',
        render:text => (
            <span>
                <Button type="link">{text}</Button>
            </span>
        )
    },
    {
        title: 'Name',
        dataIndex: 'name',
        sorter: true,
        render: name => `${name.first} ${name.last}`,
        width: '20%',
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        filters: [{ text: 'Male', value: 'male' }, { text: 'Female', value: 'female' }],
        width: '20%',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
];

 class InHouse extends Component{

    state = {
        data: [],
        pagination: {},
        loading: false,
    };


    handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.fetch({
            results: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    };

    fetch = async (params = {}) => {

        this.setState({ loading: true });

        const data = await reqwest('5');

        console.log('data:', data);

        const pagination = { ...this.state.pagination };
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = 200;
        this.setState({
            loading: false,
            data: data.results,
            pagination,
        });

    };

     componentDidMount() {
         this.fetch();
     }


     render(){

        const { getFieldDecorator } = this.props.form;
        return (
            <div className='in_house'>
                <Card >
                    <div className='in_house_header'>
                        <Form className="in_house_form" layout="inline" >
                            <Row>
                                <Col span={3} offset={11}>
                                    <Form.Item  className='in_house_form_item'>
                                        {getFieldDecorator('number')( <Input placeholder="入库单编号"/>)}
                                    </Form.Item>
                                </Col>
                                <Col span={3}>
                                    <Form.Item  className='in_house_form_item'>
                                        {getFieldDecorator('number')( <Input placeholder="入库单编号"/>)}
                                    </Form.Item>
                                </Col>
                                <Col span={3}>
                                    <Form.Item  className='in_house_form_item'>
                                        {getFieldDecorator('number')( <Input placeholder="入库单编号"/>)}
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item  className='in_house_form_item'>
                                        <Button icon="search" type="primary" htmlType="submit">
                                            Search
                                        </Button>
                                        <Button icon="rollback" style={{ marginLeft: 8 }} onClick={this.handleReset}>
                                            Clear
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>

                        </Form>
                    </div>
                    <Table
                        columns={columns}
                        rowKey={record => record.login.uuid}
                        dataSource={this.state.data}
                        pagination={this.state.pagination}
                        loading={this.state.loading}
                        onChange={this.handleTableChange}
                        size = 'middle'
                    />
                </Card>
            </div>
        )
    }
}


//包装Form组件生成新的组件
const WrapInHouse = Form.create()(InHouse);
export default WrapInHouse;
