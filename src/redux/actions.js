
/**
 * 用来创建action对象工厂函数模块
 * 同步action
 * 异步action
 */
import {SAVE_USER , REMOVE_USER} from './action-type';
import { reqLogin } from '../api';
import { setItem } from '../utils/storage';

//设置同步action
const saveUser = user => ({
    type: SAVE_USER,
    data: user
});

export const removeUser = () => ({type: REMOVE_USER})

//异步action
export const saveUserAsync = (username, password) => {

    return dispatch => {
        return reqLogin(username, password)
            .then((response) => { 
            //返回用户数据和token

            //存在redux中（内存存储，刷新即没有），还需持久化存储：localStorage
            //localStorage 存储性能不好，redux存储性能更好
            //因此先在localStorage存储，redux从localStorage中读取数据，在redux操作数据
           
            //将数据存储到localStorage中
            setItem('user', response);

            //更新state
            dispatch(saveUser(response))
        })
        
    }
}