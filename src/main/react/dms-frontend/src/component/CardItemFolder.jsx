import React, { useState } from 'react';
import {FolderOutlined
} from '@ant-design/icons';
import { Card, Col } from 'antd';
import '../assets/disableStyleSelection.css'
const { Meta } = Card;

const CardItemFolder = ({triggerDrawer, data, id}) =>{
    const handleClick = event =>{
        console.log(event.detail)
        switch (event.detail){
            case 1:{
                console.log("Single")
                break
            }
            case 2:{
                alert("Your file is being uploaded!")
                console.log("Double")
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
                  onClick={handleClick}
                  hoverable
                  style={{ width: 240 }}
                  cover={<FolderOutlined key={data.id} style={{ padding: '50px', fontSize: '100px', color: '#595959' }} />}
            >
                <Meta
                    title={data.folder}
                    className="disable-text-selection"
                    description={data.owner}
                    onCopy={(e)=>{
                        e.preventDefault()
                        console.log("Gaboleh copy")
                        return false
                    }}/>
            </Card>
        </Col>
    )
}

export default CardItemFolder;