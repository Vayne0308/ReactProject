import React, { Component } from 'react';
import { Button, Icon, Modal } from 'antd';
import screenfull from 'screenfull';
import { removeItem } from '$utils/storage';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

import { removeUser } from '$redux/actions';

import './index.less';

@connect(
    state => ({
        username: state.user.user && state.user.user.username
      }),
      {
        removeUser,
      }
)
@withRouter
class HeaderMain extends Component {
    state = {
        isScreenfull: false
    }

    componentDidMount() {
        screenfull.on('change', this.handeleScreenFullChange)
    }

    componentWillUnmount() {
        screenfull.off('change', this.handeleScreenFullChange)
    }

    handeleScreenFullChange = () => {
        this.setState({
            isScreenfull: !this.state.isScreenfull
        })
    }


    screenFull = () => {
        screenfull.toggle();
    }

    logout = () => {
        // 显示对话框
        Modal.confirm({
            title: '您确认要退出登录吗？',
            onOk: () => {
                // 清空用户数据
                removeItem('user');
                this.props.removeUser();
                // 跳转到/login
                this.props.history.replace('/login');
            }
        });
    }
    render() {
        const { isScreenfull } = this.state;
        const { username } = this.props;

        return (
            <div className = 'header'>
                <div className = 'header-top'>
                    <Button size="small" onClick={this.screenFull}>
                        <Icon type={isScreenfull ? "fullscreen-exit" : "fullscreen"}  />
                    </Button>
                    <Button size="small" className='btn-i18n'>
                        English
                    </Button>
                    <span>hello, { username }</span>
                    <Button type="link" size='small' onClick={this.logout}>
                        退&nbsp;&nbsp;出
                    </Button>
                </div>
                <div className = 'header-bottom'>
                    <span className= "header-bottom-left">首页</span>
                    <span className= "header-bottom-right">2020-1-16</span>
                </div>
            </div>
        )
    }
}

export default HeaderMain;