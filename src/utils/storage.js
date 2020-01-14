//封装localStorage工具函数

const localStorage = window.localStorage;


//存储数据
export function setItem(key, value) {
    //由于localStorage存储是以文本的方式
    value = JSON.stringify(value);

    localStorage.setItem(key, value);
}

//获取数据
export function getItem(key) {
    const value  = localStorage.getItem(key)

    try {
        return JSON.parse(value);
    } catch (e) {
        return value ;
    }
}

//删除数据
export function removeItem(key) {
    localStorage.removeItem(key);
}