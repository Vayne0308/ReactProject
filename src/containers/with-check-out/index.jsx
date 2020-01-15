//检查登录高阶组件

import React, {Component} from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';


export default function WithCheckLogin(WrappedComponent) {
    
    @connect((state) => ({user: state.user}), null)
    class CheckLogin extends Component {
        //组件命名
        static displayNames = `checkLogin(${WrappedComponent.displayName ||
            WrappedComponent.name ||
            'Component'})`

        render(){
            //判断是否登录过
            //获取其状态值
            const { user: {token}, location: {pathname} } = this.props;
            if(token){
                //登录过
                if(pathname === '/login'){
                    //跳转home主页
                    return <Redirect to='/' />
                }
            } else {
                //跳转登录页面
                if(pathname ==='/'){
                    return  <Redirect to='/login' />
                }
            }
            return <WrappedComponent {...this.props}/>
        }
    };
    return CheckLogin;
}