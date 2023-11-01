import React from 'react'
import { Layout, theme, Tabs, Button, Popover, Col, Row, Divider, Avatar, List, Typography } from 'antd';
const { Text, Link } = Typography;
import {
    UserOutlined
  } from '@ant-design/icons';

const { Header } = Layout;
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

const text = <span>Account Name</span>;
const data = [
    'Account Setting',
    'Logout',
    // 'Man charged over missing wedding girl.',
    // 'Los Angeles battles huge wildfires.',
];

const content = (
    <div>
        <Row justify="center" gutter={24}>
            <Col span={9}>
                <Avatar size={64} icon={<UserOutlined />} />
            </Col>
            <Col span={15}>
                <div>Account Name</div>
                <Text type="secondary">email@gmail.com</Text>
            </Col>
        </Row>
        <Divider></Divider>
        <Row justify="center">
            <List
                dataSource={data}
                renderItem={(item) => (
                    <List.Item>
                        {item}
                    </List.Item>
                )}
            />
        </Row>
    </div>
);
const operations = <Popover placement="left" title={text} content={content} trigger="click">
                                <Button type="primary" shape="circle" icon={<UserOutlined />}></Button>
                            </Popover>;
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