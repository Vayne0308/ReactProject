import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { connect } from 'react-redux'

import { saveUserAsync } from '$redux/actions';
import WithCheckLogin from '../with-check-out';

import './index.less';
import logo from '../../assets/imgs/logo.png';
const { Item } = Form ;

@WithCheckLogin
@connect(null, { saveUserAsync })
@Form.create()
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
        //必须调用一次
        callback();
    }

    //提交登录按钮
    login = (e) => {
        //阻止表单默认行为
        e.preventDefault();
        //验证表单输入内容
        this.props.form.validateFields((err,values) => {
            /*console.log(err,values);
             err :表示错误
             当表单验证失败时会提示err错误原因
             当表单验证成功err表示null
             values表示表单的value值
            */
           //获取表单输入内容
            
            if(!err){
                //表单验证成功
                const { username, password } = values;
                //发送请求
                //#region 
                /*
                axios.post('/api/login',{ username, password })
                    .then((response) => { 
                        //console.log(response);
                        //判断是否请求成功 response.data.status
                        if(response.data.status === 0){
                            this.props.history.replace('/')
                        }else{
                            //提示错误信息
                            message.error(response.data.msg)
                            //清空密码输入框
                            this.props.form.resetFields(['password'])  
                        }
                    })
                    .catch((err) => {  
                        console.log(err);
                        message.error('网络错误~');
                        // 清空密码
                        this.props.form.resetFields(['password']);
                    })
                */
                //#endregion
                this.props.saveUserAsync(username, password )
                    .then(() => {
                        this.props.history.replace('/');
                    })
                    .catch(msg => {
                        message.error(msg);
                        this.props.form.resetFields(['password']);
                    });
            }
        })

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
                <Form className="login-form" onSubmit = {this.login}>
                    <Item>
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
                    </Item>
                    <Item>
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
                    </Item>    
                    <Item>       
                        <Button 
                        type="primary" 
                        htmlType="submit" 
                        className="login-form-button">
                            登录
                        </Button>
                    </Item>
                </Form>
           </section>
        </div>
    }
}

// export default Form.create()(Login);

export default Login ;