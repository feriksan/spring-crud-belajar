import React, { useState } from 'react';
import {
  FileOutlined
} from '@ant-design/icons';
import { Card, Col } from 'antd';
const { Meta } = Card;
import { Button } from 'antd';
import '../assets/disableStyleSelection.css'

const CardItem = ({triggerDrawer, data, id}) =>{
    const handleClick = event =>{
        switch (event.detail){
            case 1:{
                console.log("Single")
                break
            }
            case 2:{
                triggerDrawer(data, true)
                break
            }
            case 3:{
                console.log("Tripple")
            }
        }
    }

    return (
        <Col span={6} style={{padding: 10}}>
          <Card key={data.id}
            onClick={ handleClick }
            hoverable
            style={{ width: 240 }}
            cover={<FileOutlined key={data.id} style={{ padding: '50px', fontSize: '100px', color: '#595959' }} />}
          >
            <Meta title={data.filename} description={data.fileSize} />
            <br />
          </Card>
        </Col>
    )
  }

  export default CardItem;