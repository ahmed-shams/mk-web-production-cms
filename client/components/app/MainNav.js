import React, { Component } from 'react';
import Link from 'next/link';
const { SubMenu } = Menu;
import { Menu, Icon, Button } from 'antd';

class MainNav extends Component {
  state = {
    collapsed: false,
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <div style={{ maxWidth: 256 }}>
        <Button type="primary" onClick={this.toggleCollapsed} style={{ width: '100%' }}>
          <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="1">
            <Link href='/'>
              <a>
                <Icon type="home" />
                <span>Home</span>
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link href='/profile'>
              <a>
                <Icon type="profile" />
                <span>Profile</span>
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link href='/add_new'>
              <a>
                <Icon type="plus" />
                <span>Add New</span>
              </a>
            </Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="folder" />
                <span>EN_US</span>
              </span>
            }
          >
            <Menu.Item key="5">File 1</Menu.Item>
            <Menu.Item key="6">File 2</Menu.Item>
            <Menu.Item key="7">File 3</Menu.Item>
            <Menu.Item key="8">File 4</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="folder" />
                <span>EN_EU</span>
              </span>
            }
          >
            <Menu.Item key="9">FILE 5</Menu.Item>
            <Menu.Item key="10">FILE 6</Menu.Item>
            <SubMenu key="sub3" title="2019/FALL">
              <Menu.Item key="11">MEN DLP</Menu.Item>
              <Menu.Item key="12">WOMEN DLP</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

export default MainNav;
