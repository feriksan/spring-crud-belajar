import React, { useState } from 'react';
import {
  FileOutlined
} from '@ant-design/icons';
import { Card, Col } from 'antd';
const { Meta } = Card;
import { Button } from 'antd';

const CardItem = () =>{
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
      setOpen(true);
    };
    return (
        <Col span={6}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={<FileOutlined style={{ padding: '50px', fontSize: '100px', color: '#595959' }} />}
          >
            <Meta title="Nama File" description="deskripsi" />
            <br />
            <Button type="primary" onClick={showDrawer}>
              Detail
            </Button>
          </Card>
        </Col>
    )
  }

  export default CardItem;