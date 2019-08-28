import React from 'react';
import { Menu, Icon } from 'antd';
import Link from 'next/link';
const { SubMenu } = Menu;

class MainNav2 extends React.Component {
  state = {
    current: 'mail',
  };

  handleClick = e => {
    console.log('click ', e);
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
        <Menu.Item key="3">
          <Link href='/add_new'>
            <a>
              <Icon type="plus" />
              <span>Add New</span>
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link href='/all_files'>
            <a>
              <Icon type="plus" />
              <span>Sign Out</span>
            </a>
          </Link>
        </Menu.Item>
        
        {/* show log out menu*/}
      </Menu>
    );
  }
}

export default MainNav2;
