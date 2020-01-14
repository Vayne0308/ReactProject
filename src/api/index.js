//封装请求功能函数

//引入
import axiosInstance from './request';

export const reqLogin = (username, password) => {
    axiosInstance({
        url: '/login',
        method: 'POST',
        data: {
            username,
            password
        }
    })
}; 