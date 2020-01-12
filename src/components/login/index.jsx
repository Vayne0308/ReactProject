import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';


import './index.less';
import logo from './logo.png';


class Login extends Component{
    //自定义表单验证方法
    validator = (rule, value, callback) =>{
        //rule.field 获取表单key
        const name = rule.field === 'username' ? '用户名' : '密码';
        const reg = /^\w+$/ ;

        if(!value){
            callback(`${name}不能为空`)
        }else if (value.length < 4) {
            callback(`${name}必须大于4位`);
        } else if (value.length > 15) {
            callback(`${name}必须小于15位`);
        } else if (!reg.test(value)) {
            callback(`${name}只能包含英文、数字、下划线`);
        }
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return <div className='login'>
           <header className='header'>
                <img src={logo} alt="logo"/>
                <h1>React项目：后台管理系统</h1>
           </header>
           <section>
                <h1>用户登录</h1>
                <Form className="login-form">
                <Form.Item>
                    {//存在缺陷，会重复校验，简单的会使用，一般使用自定义表单校验
                    /*{getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                     })()}*/}

                    {getFieldDecorator('username', {
                        rules: [{ validator: this.validator }],
                    })( 
                        <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="用户名"
                        />,
                    )} 
                </Form.Item>
                <Form.Item>
                   {getFieldDecorator('password', {
                        rules: [{ validator: this.validator }],
                    })( 
                        <Input
                        className='login-form-password'
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="密码"
                        />,
                    )}
                </Form.Item>    
               
                        <Button 
                        type="primary" 
                        htmlType="submit" 
                        className="login-form-button">
                            登录
                        </Button>
            
                </Form>
           </section>
        </div>
    }
}

export default Form.create()(Login);
//@Form.create()
//export default Login ;