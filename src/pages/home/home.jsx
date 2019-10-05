import React, {Component} from 'react';
import "./home.less"
import {Row, Col, Divider, Card,Icon,Avatar,List} from 'antd';
/*
    首页路由
 */

export default class Home extends Component {

    render() {


        const gridStyle = {

            textAlign: 'center',
        };


        const data = [
            {
                title: 'Ant Design Title 1',
            },
            {
                title: 'Ant Design Title 2',
            },
            {
                title: 'Ant Design Title 3',
            },
            {
                title: 'Ant Design Title 4',
            },
        ];


        return (
            <div className='home'>
                <div className='home-header'>
                    <Row>
                        <Col span={3}>
                            <div>
                                <img
                                    src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"/>
                            </div>

                        </Col>
                        <Col span={13}>
                            <div className='home-header-message'>
                                <div className='message-text'>
                                    <div>早安, XX, 开心每一天</div>
                                    <div>蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED</div>
                                </div>

                            </div>
                        </Col>
                        <Col span={8}>
                            <div className='home-header-vertical'>

                                <div className='workplace-style'>
                                    <div className='home-statistic-title'>入库量</div>
                                    <div className='home-statistic-content'>56</div>
                                </div>

                                <Divider type="vertical"/>

                                <div className='workplace-style'>
                                    <div className='home-statistic-title'>出库量</div>
                                    <div className='home-statistic-content'>100</div>
                                </div>

                                <Divider type="vertical"/>

                                <div className='workplace-style'>
                                    <div className='home-statistic-title'>收益值 CNY</div>
                                    <div className='home-statistic-content'>2000</div>
                                </div>

                            </div>
                        </Col>

                    </Row>
                </div>
                <div className='home-body'>
                    <Row>
                        <Col span={16}>
                            <Card size="small" title={<Icon type="project" theme="twoTone" />} className='home-body-card' >
                                <Card.Grid style={gridStyle}>
                                    <div className="ant-card-meta-detail">
                                        <div className="ant-card-meta-title">
                                            <div className="antd-pro-pages-dashboard-workplace-style-cardTitle">
                                                <span ><Icon type="right-square" theme="twoTone" twoToneColor="#5e72e4" /> </span> <a href="/">入库单据</a></div>
                                        </div>
                                        <div className="ant-card-meta-description">那是一种内在的东西，他们到达不了，也无法触及的</div>
                                    </div>
                                </Card.Grid>
                                <Card.Grid style={gridStyle}>
                                    <div className="ant-card-meta-detail">
                                        <div className="ant-card-meta-title">
                                            <div className="antd-pro-pages-dashboard-workplace-style-cardTitle">
                                                <span > <Icon type="left-square" theme="twoTone" twoToneColor="#5e72e4" /></span> <a href="/">出库单据</a></div>
                                        </div>
                                        <div className="ant-card-meta-description">那是一种内在的东西，他们到达不了，也无法触及的</div>
                                    </div>
                                </Card.Grid>
                                <Card.Grid style={gridStyle}>
                                    <div className="ant-card-meta-detail">
                                        <div className="ant-card-meta-title">
                                            <div className="antd-pro-pages-dashboard-workplace-style-cardTitle">
                                                <span > <Icon type="bank" theme="twoTone" twoToneColor="#fb6340"/></span> <a href="/">库存管理</a></div>
                                        </div>
                                        <div className="ant-card-meta-description">那是一种内在的东西，他们到达不了，也无法触及的</div>
                                    </div>
                                </Card.Grid>
                            </Card>
                            <Card size="small" title={<Icon type="calendar" theme="twoTone" />} className='home-body-card'>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={data}
                                    renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta
                                                avatar={<Avatar src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" />}
                                                title={<a href="https://ant.design">{item.title}</a>}
                                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                            />
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card size="small" title={<Icon type="fund" theme="twoTone" />} className='home-body-card'>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={data}
                                    renderItem={item => (
                                        <List.Item>
                                            <List.Item.Meta
                                                avatar={<Avatar src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" />}
                                                title={<a href="https://ant.design">{item.title}</a>}
                                                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                            />
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
