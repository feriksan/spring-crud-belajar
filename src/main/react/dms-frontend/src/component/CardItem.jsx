import React, { useState } from 'react';
import {
  FileOutlined
} from '@ant-design/icons';
import { Card, Col } from 'antd';
const { Meta } = Card;
import { Button } from 'antd';

const CardItem = ({triggerDrawer, data}) =>{
    function openDrawer(dataDrawer){
      triggerDrawer(dataDrawer, true)
    }
    return (
        <Col span={6} style={{padding: 10}}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<FileOutlined style={{ padding: '50px', fontSize: '100px', color: '#595959' }} />}
          >
            <Meta title={data.filename} description={data.fileSize} />
            <br />
            <Button type="primary" onClick={ () => openDrawer(data.filename) }>
              Detail
            </Button>
          </Card>
        </Col>
    )
  }

  export default CardItem;