import React from 'react'
import { Layout, theme } from 'antd';
import { Tabs, Button } from 'antd';
import {
    UserOutlined
  } from '@ant-design/icons';

const { Header } = Layout;
const operations = <Button type="primary" shape="circle" icon={<UserOutlined />} />;
const itemsNavTop = [
    {
        key: '1',
        label: 'Recent'
    },
    {
        key: '2',
        label: 'All'
    },
    {
        key: '3',
        label: 'Assigned'
    },
    {
        key: '4',
        label: 'Checked Out (0)'

    },
    {
        key: '5',
        label: 'Pinned'
    },
];

const HeaderHome = () =>{
    const onChange = (key) => {
        console.log(key);
    };
    const {
        token: { colorBgContainer },
      } = theme.useToken();

    return (
        <Header
            style={{
            padding: 0,
            paddingLeft: 50,
            paddingRight: 50,
            paddingTop: 10,
            background: colorBgContainer,
            }}
        >
            <Tabs tabBarExtraContent={operations} defaultActiveKey="1" items={itemsNavTop} onChange={onChange} />
        </Header>
    )
}

  export default HeaderHome;