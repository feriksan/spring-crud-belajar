import React, { useState } from 'react';
import {FolderOutlined
} from '@ant-design/icons';
import { Card, Col } from 'antd';
import '../assets/disableStyleSelection.css'
import API from "../helper/API.js";
const { Meta } = Card;
const api = new API()

const CardItemFolder = ({triggerDrawer, data, id}) =>{

    const getFile = async(params) => {
        console.log("Dipanggil")
        await api
            .getFileAndDir(params)
            .then((response) => {
                console.log(response)
                triggerDrawer(response.data.Folder)
            })
    };
    const handleClick = event =>{
        console.log(event.detail)
        switch (event.detail){
            case 1:{
                console.log("Single")
                break
            }
            case 2:{
                // alert("Your file is being uploaded!: " + data.id)
                {getFile(2)}
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