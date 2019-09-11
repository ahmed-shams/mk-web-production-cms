import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Icon, Button } from 'antd';
import Link from 'next/link';
import { LOG_OUT_REQUEST } from '../../reducers/user';
import Router from 'next/router';
const { SubMenu } = Menu;


const MainNavigation = () => {
  const dispatch = useDispatch();
  const [current, setCurrent] = useState('1');
  const { me } = useSelector(state => state.user);
  const handleClick = (e) => {
    setCurrent(e.key);
  }

  // useEffect(() => {
  //   if(!me) {
  //     alert("Please login. Redirecting to login page...");
  //     Router.push('/user/login');
  //   }
  // }, [me])

  const onLogout = useCallback(() => {
    console.log("log out fn");
    dispatch({
      type: LOG_OUT_REQUEST
    })
  }, [])

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
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
      <SubMenu key="3"
        title={
          <span className="submenu-title-wrapper">
            <Icon type="plus" />
            Add New
          </span>
        }
      >
        <Menu.Item key="setting:33">
          <Link href='/add_new'>
            <a>
            <Icon type="file" />
            <span>Add New File</span>
          </a>
          </Link>
        </Menu.Item>
        <Menu.Item>
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
        {/* <Link href='/user/logout'>
          <a>
            <Icon type="logout" />
            <span>Sign Out</span>
          </a>
        </Link> */}
        <Button onClick={onLogout}>
          <Icon type="logout" />
          Sign Out
        </Button>
      </Menu.Item>
    </Menu>
  );
}

export default MainNavigation;
