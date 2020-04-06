/*
    1.能够发送异步ajax请求的函数模块
    2.封装axios库
    3.函数的返回值是promise对象

    1.优化 请求异常
 */

import axios from 'axios'
import {notification} from 'antd'
import memoryUtils from "../utils/memoryUtils";
import storageUtils from "../utils/storageUtils";



export default function ajax(url, data={}, type='GET') {
    return new Promise((resolve, reject) => {

        let promise;

        //1.执行异步ajax请求
        axios.defaults.headers.common["Authorization"] = memoryUtils.user.Authorization;
        if (type === 'GET') {
            promise = axios.get(url, {params: data});
        } else {
            promise = axios.post(url, data);
        }



        promise.then(response =>{
            //2.如果成功了，调用 resolve (value)
            resolve(response);
        }).catch(error => {
            //message.error('请求出错：'+ error.message);
            notification.error({
                message: '错误',
                description:error.message,
                placement:'bottomRight'
            });
            console.log(error);
            // //2.如果失败了
            // if ('500' == error.request.status) {
            //     window.location.href = "http://localhost:3000/error/500.html"
            // } else if ('404' == error.request.status) {
            //     window.location.href = "http://localhost:3000/error/404.html"
            // } else {
            //     message.error('请求出错：'+ error.message)
            // }

        })

    });


}
