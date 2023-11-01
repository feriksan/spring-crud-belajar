import React, {useState} from 'react';
import { Card, Space, Button, Row, Col, Timeline, Collapse } from 'antd';
import {
    FileOutlined,
    DownloadOutlined,
    EyeOutlined,
    ShareAltOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import CardItem from "./CardItem.jsx";

const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
const handleChange = (value) => {
    console.log(`selected ${value}`);
};


const DrawerContent = ({drawerData}) =>{
    const [size, setSize] = useState('large')
    const onChange = (key) => {
        console.log(key);
      };
    const items = [
        {
          key: '1',
          label: 'Open to see history',
          children:
            <Timeline
                items={[
                    {
                        children: 'File Diupload',
                    },
                    {
                        children: 'User memberikan hak akses kepada User 2',
                    },
                    {
                        children: 'User 2 mengupdate file',
                    },
                    {
                        children: 'User 1 mengupdate file',
                    },
                ]}
            />,
        }
      ];
    drawerData.forEach(metadata=>{
        var cardItem = [
            <Row gutter={16}>
                {
                    metadata.map(metadataText => {
                        return <div>{metadataText}</div>
                    })
                }
            </Row>
        ]
    })
    return (
        <Space align="center" direction="vertical" size="large" style={{ display: 'flex' }}>
            <Card
                hoverable
                style={{ width: 140 }}
                cover={<FileOutlined style={{ paddingTop: '40px', fontSize: '50px', color: '#595959' }} />}
            >
            </Card>
            <Row gutter={16}>
                <Col span={6}><Button type="primary" icon={<DownloadOutlined />} /></Col>
                <Col span={6}><Button type="primary" icon={<EyeOutlined />} /></Col>
                <Col span={6}><Button type="primary" icon={<ShareAltOutlined />} /></Col>
                <Col span={6}><Button type="primary" icon={<DeleteOutlined />} /></Col>
            </Row>
            <br />
            <Card
                style={{
                width: 300,
                }}
            >
                cardItem
            </Card>
            <Collapse items={items} defaultActiveKey={['1']} ghost onChange={onChange} />
            {/* <Form
                name="basic"
                layout='horizontal'
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            > */}
            {/* <Row gutter={24} align="top">
                <Col span={5}>
                Username
                </Col>
                <Col span={2}>
                    <div>
                        :
                    </div>
                </Col>
                <Col span={16}>
                    <Form.Item
                        name="username"
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24} align="top">
                <Col span={5}>
                Username
                </Col>
                <Col span={2}>
                    <div>
                        :
                    </div>
                </Col>
                <Col span={16}>
                    <Form.Item
                        name="username"
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row> */}
            {/* <Row gutter={24} align="top">
                <Form.Item
                    label="Username"
                    name="username"
                >
                    <Input />
                </Form.Item>
            </Row> */}
            {/* <Row gutter={24} align="top">
                <Form.Item
                    label="Username"
                    name="username"
                >
                    <Input />
                </Form.Item>
            </Row> */}
            {/* <Space direction='vertical' size="small" align='start'>
            <Row gutter={24} align="center">
                <Form.Item
                    label="Username"
                    name="username"
                >
                    <Input />
                </Form.Item>
            </Row>
            <Row gutter={24} align="center">
                <Form.Item
                    label="A"
                    name="username"
                >
                    <Input />
                </Form.Item>
            </Row>
                <Form.Item
                    name="select"
                    label="Select"
                >
                    <Select
                        defaultValue="lucy"
                        style={{ width: 120 }}
                        onChange={handleChange}
                        options={[
                            { value: 'jack', label: 'Jack' },
                            { value: 'lucy', label: 'Lucy' },
                            { value: 'Yiminghe', label: 'yiminghe' },
                            { value: 'disabled', label: 'Disabled', disabled: true },
                        ]}
                    />
                </Form.Item>
                <Form.Item
                label="Filename"
                name="Filename"
                >
                <Input disabled/>
                </Form.Item>
                <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
                >
                </Form.Item>
            </Space> */}
        {/* </Form> */}
        </Space>
    )
}

export default DrawerContent;