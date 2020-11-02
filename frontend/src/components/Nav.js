import React from 'react';
import {Link} from 'react-router-dom'
import { Layout, Menu } from 'antd';
import "antd/dist/antd.css";
import '../App.css';

const { Header } = Layout;

function Nav() {
  return (
    <Layout className="layout">
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          
          <Menu.Item key="1">Home <Link to='/'/></Menu.Item>
          <Menu.Item key="2">Jams<Link to='/jams'/></Menu.Item>
          <Menu.Item key="3">Learning<Link to='/learning'/></Menu.Item>
          <Menu.Item key="4">Profile<Link to='/profile'/></Menu.Item>
      </Menu>
    </Header>
  </Layout>
  );
}

export default Nav;
