import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link, withRouter } from 'react-router-dom';


const { SubMenu, Item } = Menu;
import menus from '$conf/menus';


@withRouter   //给子组件传递路由组件的三大属性
export default class LeftNav extends Component {
    
    createMenus = menus => {
        //遍历菜单
        return menus.map(menu => {
            //判断是否有二级菜单
            if(menu.children) {
                return (
                    <SubMenu
                        key={menu.path}
                        title={
                        <span>
                            <Icon type={menu.icon} />
                            <span>{menu.title}</span>
                        </span>
                        }
                    >
                        {menu.children.map(cMenu => this.createMenuItem(cMenu))}
                    </SubMenu>
                );
            } else {
                // 一级菜单
                return this.createMenuItem(menu);
            }
        })
    }

    //创建一个设置列表组件的方法
    createMenuItem = menu => {
        return (
            <Item key={menu.path}>
            <Link to={menu.path}>
                <Icon type={menu.icon} />
                <span>{menu.title}</span>
            </Link>
            </Item>
        );
    };

    //创建一个查找方法
    findOpenKeys = (pathname, menus) => {
        /*
          遍历数据，找某个元素。
            当返回值是true，就找到了，并找到的值返回
            当返回值是false，接着遍历找
              直到全部遍历完，没有找到返回undefined
        */
        const menu = menus.find((menu) => {
          if (menu.children) {
            return menu.children.find((cMenu) => cMenu.path === pathname)
          } 
        });
        
        if (menu) {
          return menu.path
        }
      }

    render(){

        const { pathname } = this.props.location;

        const openKey = this.findOpenKeys(pathname, menus);

        return (
            <Menu
              theme='dark' // 主题色
              defaultSelectedKeys={[pathname]} // 默认选中的菜单
              defaultOpenKeys={[openKey]} // 默认展开的菜单
              mode='inline'
            >
              {this.createMenus(menus)}
            </Menu>
          ); 
    }
}
