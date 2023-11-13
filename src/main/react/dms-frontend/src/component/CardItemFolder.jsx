import React, { useState } from 'react';
import {
    FileOutlined, FolderOutlined
} from '@ant-design/icons';
import { Card, Col } from 'antd';
const { Meta } = Card;
import { Button } from 'antd';

const CardItemFolder = ({triggerDrawer, data, id}) =>{
    console.log(data)
    const handleClick = event =>{
        console.log(event.detail)
        switch (event.detail){
            case 1:{
                console.log("Single")
            }
            case 2:{
                alert("Your file is being uploaded!")
                console.log("Double")
            }
            case 3:{
                console.log("Tripple")
            }
        }
    }
    return (
        <Col span={6} style={{padding: 10}}>
            <Card key={data.id}
                  onClick={handleClick}
                  hoverable
                  style={{ width: 240 }}
                  cover={<FolderOutlined key={data.id} style={{ padding: '50px', fontSize: '100px', color: '#595959' }} />}
            >
                <Meta title={data.folder} description={data.owner} />
            </Card>
        </Col>
    )
}

export default CardItemFolder;