import React, {useState} from 'react';
import { Card, Space, Button, Row, Col, Input, Select } from 'antd';
import {
    FileOutlined,
    DownloadOutlined,
    EyeOutlined,
    ShareAltOutlined
} from '@ant-design/icons';

const handleChange = (value) => {
    console.log(`selected ${value}`);
};

const DrawerContent = () =>{
    const [size, setSize] = useState('large')
    return (
        <Space align="center" direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Card
                hoverable
                style={{ width: 140 }}
                cover={<FileOutlined style={{ paddingTop: '40px', fontSize: '50px', color: '#595959' }} />}
            >
            </Card>
            <Row gutter={16}>
                <Col span={8}><Button type="primary" icon={<DownloadOutlined />} /></Col>
                <Col span={8}><Button type="primary" icon={<EyeOutlined />} /></Col>
                <Col span={8}><Button type="primary" icon={<ShareAltOutlined />} /></Col>
            </Row>
            
            <Input placeholder="Basic usage" />
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
            <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size}>
                Download
            </Button>
        </Space>
    )
}

export default DrawerContent;