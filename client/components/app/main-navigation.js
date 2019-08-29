import React from 'react';
import { Menu, Icon } from 'antd';
import Link from 'next/link';
const { SubMenu } = Menu;

class MainNavigation extends React.Component {
  state = {
    current: '',
  };

  handleClick = e => {
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
        <Menu.Item key="1">
          <Link href='/'>
            <a>
              <Icon type="home" />
              <span>Home</span>
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link href='/user/profile'>
            <a>
              <Icon type="profile" />
              <span>Profile</span>
            </a>
          </Link>
        </Menu.Item>
        <SubMenu
          title={
            <span className="submenu-title-wrapper">
              <Icon type="plus" />
              Add New
            </span>
          }
        >
          <Menu.Item key="setting:1">
            <Link href='/add_new'>
              <a>
              <Icon type="file" />
              <span>Add New File</span>
            </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="setting:1">
            <Link href='/add_new_folder'>
              <a>
              <Icon type="folder" />
              <span>Add New Folder</span>
            </a>
            </Link>
          </Menu.Item>
        </SubMenu>

        <Menu.Item key="4">
          <Link href='/all_files'>
            <a>
              <Icon type="file-text" />
              <span>All Files</span>
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link href='/user/logout'>
            <a>
              <Icon type="logout" />
              <span>Sign Out</span>
            </a>
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default MainNavigation;
