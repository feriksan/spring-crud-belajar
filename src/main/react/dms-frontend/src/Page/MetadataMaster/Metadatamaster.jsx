import React, {Component, useState} from 'react';
import {Button, Form, Input, Modal, Space, Table, Tag} from 'antd';
import LayoutMain from "../../Layout/Layout.jsx";
import {InboxOutlined, MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import axios from "axios";
const columns = [
    {
        title: 'Metadata Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Metadata Child',
        key: 'child',
        dataIndex: 'child',
        render: (_, { tags }) => (
            <>
                {tags.map((tag) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
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

const data = [
    {
        key: '1',
        name: 'File Type',
        description: "file type",
        tags: ['PDF', 'DOCX', 'XLXS'],
    },
    {
        key: '2',
        name: 'Urgentcy',
        description: "File Urgentcy",
        tags: ['important', 'not important', 'ready to delete'],
    },
    {
        key: '3',
        name: 'Content',
        description: "content summary",
        tags: ['accuntant', 'book'],
    },
];


class Metadatamaster extends Component{

    constructor(props) {
        super(props);
        this.state = {
            metadata: null,
            isLogin:false,
            token:null,
        };
    }
    async getMetadata({token}){
        console.log("On Load: "+ token)
        const response = await axios({
            method: 'get',
            url: "http://localhost:99/metadataMaster/findAll",
            headers: {
                "Authorization": "Bearer " + token,
            },
        })
        console.log(data)
        console.log(response.data)
        this.setState({fileArray:response.data})
        this.setState({loading:false})
    }

    componentDidMount() {
        const login = localStorage.getItem('isLogin');
        const token = localStorage.getItem('token');
        this.getMetadata({token})
        // if(login === "login"){
        //     this.setState({
        //         isLogin:true,
        //         token:token
        //     })
        //
        // }

    }

    render() {
        return (
            <LayoutMain>
                <ModalHandler />
                <Table columns={columns} dataSource={data} />
            </LayoutMain>
        );
    }
}

function ModalHandler(){
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
    };
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