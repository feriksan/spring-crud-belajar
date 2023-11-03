import React, {useState} from 'react';
import { Card, Space, Button, Row, Col, Timeline, Collapse, Tag } from 'antd';
import {
    FileOutlined,
    DownloadOutlined,
    EyeOutlined,
    ShareAltOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import CardItem from "./CardItem.jsx";


const DrawerContent = ({drawerData}) =>{
    console.log(drawerData)
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
    const kartuItem = [
        <Row gutter={16}>
            {
                drawerData.map(metadataText => {
                    return <div><Tag>{metadataText.metadata_value}</Tag></div>
                })
            }
        </Row>
    ];
    console.log(kartuItem)
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
                {kartuItem}
            </Card>
            <Collapse items={items} defaultActiveKey={['1']} ghost onChange={onChange} />
        </Space>
    )
}

export default DrawerContent;