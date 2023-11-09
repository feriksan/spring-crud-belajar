import React, {Component, useState} from 'react';
import {Button, Form, Input, Modal, Skeleton, Space, Table } from 'antd';
import LayoutMain from "../../Layout/Layout.jsx";
import axios from "axios";
import API from "../../helper/API.js";
const columns = [
    {
        title: 'Metadata Name',
        dataIndex: 'metadata_key',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>Edit {record.name}</a>
                <a>Delete</a>
            </Space>
        ),
    },
];

let data = [
    {
        key: '1',
        metadata_key: 'File Type',
        description: "file type",
    },
    {
        key: '2',
        metadata_key: 'Urgently',
        description: "File Urgently",
    },
    {
        key: '3',
        metadata_key: 'Content',
        description: "content summary",
    },
];
const api = new API()
class Metadatamaster extends Component{

    constructor(props) {
        super(props);
        this.state = {
            metadata: null,
            isLogin:false,
            token:null,
            loading:true
        };
    }
    async getMetadata({tokenData}){
        console.log("On Load: "+ tokenData)
        await api
            .getMetadaList()
            .then(response => this.renderList(response.data))

        // const response = await axios({
        //     method: 'get',
        //     url: "http://localhost:99/metadataMaster/findAll",
        //     headers: {
        //         "Authorization": "Bearer " + tokenData,
        //     },
        // })
    }

    renderList(dataAPi){
        let keyCount = 4;
        let dataTemp = []
        dataAPi.forEach(element => {
            element.key = keyCount
            dataTemp.push(element)
            keyCount++
        })
        data = dataTemp
        console.log(data)
        console.log("METADATA MASUK")
        this.setState({loading:false})
    }

    componentDidMount() {
        const login = localStorage.getItem('isLogin');
        const tokenData = localStorage.getItem('token');
        this.getMetadata({tokenData})
        this.setState({
            token:tokenData,
            login:login
        })
    }

    render() {
        const {loading} = this.state;
        if(loading){
            return(
                <LayoutMain page={'9'}>
                    <Skeleton active />
                </LayoutMain>
                )
        }
        return (
            <LayoutMain page={'9'}>
                <ModalHandler token={this.state.token}/>
                <Table columns={columns} dataSource={data} />
            </LayoutMain>
        );
    }
}

function ModalHandler({token}){
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        const data = {
            metadata_key: values.metadataName,
            description: values.metadataDescription
        };
        addMetadata(data)
    };
    const addMetadata = async(data) => {
        api
            .addMetada(data)
            .then(response => console.log(response))
        // const response = await axios({
        //     method: 'post',
        //     url: "http://localhost:99/metadataMaster/create",
        //     data:data,
        //     headers: {
        //         "Authorization": "Bearer " + token,
        //     },
        // })
        // console.log(response)
    }

    return(
        <>
            <Button type="primary" onClick={showModal}>
                New Metadata
            </Button>
            <Modal title="New Metadata" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Metadata Name"
                        name="metadataName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input metadata!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Metadata Description"
                        name="metadataDescription"
                    >
                        <Input />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form>
            </Modal>
        </>
    )
}
export default Metadatamaster;