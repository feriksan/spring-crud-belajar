import React, { useState } from 'react';
import {
  FileOutlined
} from '@ant-design/icons';
import { Card, Col } from 'antd';
const { Meta } = Card;
import { Button } from 'antd';

const CardItem = ({triggerDrawer, data, id}) =>{
    console.log(data)
    function openDrawer(dataDrawer){
      triggerDrawer(dataDrawer, true)
    }
    return (
        <Col span={6} style={{padding: 10}}>
          <Card key={data.id}
            hoverable
            style={{ width: 240 }}
            cover={<FileOutlined key={data.id} style={{ padding: '50px', fontSize: '100px', color: '#595959' }} />}
          >
            <Meta title={data.filename} description={data.fileSize} />
            <br />
            <Button key={data.id} type="primary" onClick={ () => openDrawer(data) }>
              Detail
            </Button>
          </Card>
        </Col>
    )
  }

  export default CardItem;