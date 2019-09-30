/*
    1.能够发送异步ajax请求的函数模块
    2.封装axios库
    3.函数的返回值是promise对象
 */

import axios from 'axios'

export default function ajax(url, data={}, type='GET') {

    if (type === 'GET') {
        return axios.get(url, {
            params: data});
    } else {
        return axios.post(url, data);
    }
}
