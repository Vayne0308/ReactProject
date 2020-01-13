//使用拦截器对axios进行封装

import axios from 'axios';
import errCode from '../config/error-code'

//创建axios实例
const axiosInstance = axios.create({
    baseURL: '/api',  //公共路径
    timeout: 20000,   //请求超时时间
    headers: {}
})

//设置拦截器
//请求拦截器
axiosInstance.interceptors.request.use(
    //设置发送请求
    (config) => {
        let token = '';
        //添加动态headers参数 token
        if (token) {
            config.headers.authorization = `Bearer ${token}`
        }

        //设置请求体参数满足form表单形式
        if(config.method === 'post' ){
            const keys = Object.keys(config.data);
            //将data请求体参数转为字符串格式
            keys.reduce((prev, curr) => {
                prev += `&${curr} = ${config.data[curr]}`;
                return prev;
            },'').slice(1);
            //将字符串格式的data数据更新
            config.data = data;

            config.headers['content-type'] = 'application/x-www-form-urlencoded'
        }
        return config;
    }
)
//响应拦截器
axiosInstance.interceptors.response.use(
    (response) => {
        if(response.data.status === 0){
            //响应成功
            return response.data.data;
        }else{
            //请求成功，响应失败的原因
            return Promise.reject(response.data.msg);
        }
    },
    //错误原因
    (err) => {

        let errMsg = '';

        if(err.response){
            //接收响应但失败，根据响应状态码来判断
            errMsg = errCode[err.response.status];
        }else{
            //未接收响应，响应失败,根据响应错误原因判断
            if(err.message.indexof('Network Error') !== -1){
                errMsg = '网络连接失败，请重连网络'
            }else if(err.message.indexof('timeout') !== -1){
                errMsg = '网络超时，请连上WiFi'
            }
        }

        //如上述条件均未成功，设置默认值
        return Promise.reject( errMsg || '发生未知错误，请联系管理员')
    }
)

export default axiosInstance;