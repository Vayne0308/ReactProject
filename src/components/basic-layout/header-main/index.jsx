import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import screenfull from 'screenfull';

import './index.less';
export default class HeaderMain extends Component {
    state = {
        isScreenfull: false
    }

    componentDidMount() {
        screenfull.on('change', this.handeleScreenFullChange)
    }

    componentWillUnmount() {
        screenfull.off('change', this.handeleScreenFullChange)
    }

    handeleScreenFullChange = () {
        this.setState({
            isScreenfull: !this.state.isScreenfull
        })
    }
    screenFull = () => {
        screenfull.toggle();
    }
    render() {
        const { isScreenfull } = this.state;
        return (
            <div className = 'header'>
                <div className = 'header-top'>
                    <Button size="small" onClick={this.screenFull}>
                        <Icon type={isScreenfull ? "fullscreen-exit" : "fullscreen"}  />
                    </Button>
                    <Button size="small" className='btn-i18n'>
                        English
                    </Button>
                    <span>hello, admin</span>
                    <Button type="link" size='small'>
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
