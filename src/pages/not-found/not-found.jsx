import React, {Component} from 'react';
import {Button, Result} from 'antd';
/*
    商品路由
 */

export default class NotFound extends Component{

    render(){
        return (
            <Result
                status="404"
                title="404"
                subTitle="对不起, 页面未找到."
                extra={<Button type="primary">Back Home</Button>}
            />
        )
    }
}



