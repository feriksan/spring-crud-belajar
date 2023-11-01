import React, {Component, useState} from 'react';
import { Card, Space, Button, Row, Col, Timeline, Collapse } from 'antd';
import {
    FileOutlined,
    DownloadOutlined,
    EyeOutlined,
    ShareAltOutlined,
    DeleteOutlined
} from '@ant-design/icons';

class DrawerContent extends Component{
    state = {
        items:null
    };
    render() {
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
                <div>Metadata File</div>
                <div>Upload Timestamp</div>
                <div>Owner</div>
                <div>Last Edit/User</div>
            </Card>
            <Collapse items={items} defaultActiveKey={['1']} ghost onChange={onChange} />
        </Space>
    }
}