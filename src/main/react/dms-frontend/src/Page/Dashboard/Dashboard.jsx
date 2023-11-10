import React, {Component, useState } from 'react';
import {
    Input,
    Drawer,
    Collapse,
    Button,
    Upload,
    Modal,
    Form,
    Layout,
    theme,
    Skeleton,
    Col,
    Row, Space, Select, message
} from 'antd';
const {  Content, Footer } = Layout;
const { Dragger } = Upload;
const { Search } = Input;
import {
    InboxOutlined, UploadOutlined,
} from '@ant-design/icons';
import Sidebar from '../../component/Navigation/Sidebar.jsx'
import HeaderHome from '../../component/Navigation/Header.jsx'
import CardItem from '../../component/CardItem'
import DrawerContent from '../../component/DrawerContent'
import Login from "../../Page/Auth/Login.jsx";

import API from "../../helper/API.js";
const onSearch = (value, _e, info) => console.log(info?.source, value);
const api = new API()
class DashboardComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            fileArray: null,
            folderArray:null,
            error:true,
            loading:true,
            isLogin:false,
            dataApis:null
        };
    }

    async getFiles(){
        console.log("begin get file")
        await api
            .getFileList()
            .then((response) => this.renderList(response.data))
    }

    renderList = (data) =>{
        console.log(data)
        const unique = [...new Set(data.map(item => item.subfolder))];
        this.setState({folderArray:unique})
        let dataList = []
        data.forEach(element => {
            const metadataList = [];
            const fileList = [];
            element.fileHistories.forEach(file => {
                file.fileMetadata.forEach(metadata => {
                    metadataList.push(metadata)
                })
                let files = {
                    "id":element.id,
                    "filename": file.filePath,
                    "subfolder":element.subfolder,
                    "fileSize": element.fileSize + element.fileSizeUnit,
                    "dateCreated": file.date_created,
                    "metadata": metadataList
                }
                fileList.push(files)
            })
            const dataCard = {
                "owner": element.fileHistories[0].owner,
                "data": fileList
            };
            dataList.push(dataCard)
        })
        this.setState({fileArray:dataList})
        this.setState({loading:false})
    }

    handleLogin = (token) =>{
        this.setState({
            isLogin:true,
            token:token
        })
        localStorage.setItem('isLogin', "login");
    }

    componentDidMount() {
        const login = localStorage.getItem('isLogin');
        if(login === "login"){
            this.setState({
                isLogin:true,
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        prevState.isLogin === this.state.isLogin ? console.log('already login') : this.getFiles()
    }

    render() {
        const {isLogin, loading, fileArray} = this.state;

        if (!isLogin) {
            return <Login loginHandler={this.handleLogin}></Login>;
        }
        if (loading) {
            return (
                <DashboardItem>
                    <Skeleton active />
                </DashboardItem>
            )
        }
        return <DashboardItem>
            <ContentDashboard fileArray={fileArray}/>
        </DashboardItem>
    }
}

function ContentDashboard(fileArray){
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    const [prevOpen, setPrevOpen] = useState();
    const [drawerData, setDrawerData] = useState();
    const [files, setFiles] = useState();
    let [metadata, setMetadata] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [form] = Form.useForm();

    const formHandler = (data) =>{
        const formData = new FormData();
        const metadataJson = {
            metadata:[]
        }
        setUploading(true);
        metadata.map(element =>{
            let json = {
                metadata_key: element,
                metadata_value: data[element]
            }
            metadataJson.metadata.push(json)
        })
        const subfolder = "test3";
        formData.append("file", files);
        formData.append("fileSize", files.size)
        formData.append("fileSizeUnit", "Kb")
        formData.append("metadata", JSON.stringify(metadataJson));
        formData.append("subfolder", subfolder);
        api
            .addFile(formData)
            .then(response => {
                form.resetFields();
                {handleCancel()}
                message.success('upload successfully.')
            })
            .catch((e) => {
                message.error('upload Failed.' + e)
            })
            .finally(() => {
                setUploading(false);
            })
    }
    const drawerOpen = (data, logic) => {
        setPrevOpen(logic)
        setDrawerData(data)
    }
    const onClose = () => {
        setPrevOpen(false);
    };
    const onFinish = (values) => {
        formHandler(values)
        console.log('Received values of form: ', values);
    };
    var itemsCollaps = [];
    var count = 1;
    let cardItemNotGroup = [];
    fileArray.fileArray.forEach(element => {
        const cardItemNotGroupItem = [
            element.data.map(cardData => {
                return <CardItem triggerDrawer={drawerOpen} data={cardData} id={count}/>
            })
        ]
        cardItemNotGroup.push(cardItemNotGroupItem)
        count++
    });

    const itemObject = {
        key: count,
        label: "Data",
        children: [
            <Row>
                {cardItemNotGroup}
            </Row>
        ],
    };
    itemsCollaps.push(itemObject)
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
    const normFile = (e) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const options = [];
    options.push({
        label: "Jenis Dokumen",
        value: "Jenis Dokumen",
    });
    options.push({
        label: "Divisi",
        value: "Divisi",
    });
    options.push({
        label: "Ukuran File",
        value: "Ukuran File",
    });
    const handleChange = (value) => {
        setMetadata(value)
        console.log(`selected ${value}`);
    };

    const props2 = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
            setFiles(null)
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
            setFiles(file)
            return false;
        },
        fileList,
    };

    return (
        <>
            <div
                style={{
                    padding: 24,
                    minHeight: 500,
                    background: colorBgContainer,
                }}
            >
                <Row gutter={16}>
                    <Col className="gutter-row" span={19}>
                        <Button type="primary" onClick={showModal}>
                            New File
                        </Button>
                        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                            <Form
                                form={form}
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    label="Pilih Metadata Master"
                                    name="List Metadata">
                                    <Space
                                        style={{
                                            width: '100%',
                                        }}
                                        direction="vertical"
                                    >
                                        <Select
                                            mode="multiple"
                                            allowClear
                                            style={{
                                                width: '100%',
                                            }}
                                            placeholder="Please select"
                                            onChange={handleChange}
                                            options={options}
                                        />
                                    </Space>
                                </Form.Item>
                                {metadata.map(element =>{
                                    return <Form.Item
                                        label={element}
                                        name={element}
                                    >
                                        <Input placeholder={element}/>
                                    </Form.Item>
                                })}
                                <Form.Item label="Upload">
                                    <Form.Item name="upload" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                                        <Upload {...props2}>
                                            <Button icon={<UploadOutlined />}>Select File</Button>
                                        </Upload>
                                    </Form.Item>
                                </Form.Item>
                                {/*<Form.Item label="Dragger">*/}
                                {/*    <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>*/}
                                {/*        <Dragger {...props}>*/}
                                {/*            <p className="ant-upload-drag-icon">*/}
                                {/*                <InboxOutlined />*/}
                                {/*            </p>*/}
                                {/*            <p className="ant-upload-text">Click or drag file to this area to upload</p>*/}
                                {/*            <p className="ant-upload-hint">*/}
                                {/*                Support for a single or bulk upload. Strictly prohibited from uploading company data or other*/}
                                {/*                banned files.*/}
                                {/*            </p>*/}
                                {/*        </Dragger>*/}
                                {/*    </Form.Item>*/}
                                {/*</Form.Item>*/}
                                <Button type="primary" htmlType="submit" loading={uploading} disabled={fileList.length === 0}>
                                    {uploading ? 'Uploading' : 'Start Upload'}
                                </Button>
                            </Form>
                        </Modal>
                    </Col>
                    <Col className="gutter-row" span={5}>
                        <Search
                            placeholder="input search text"
                            onSearch={onSearch}
                            style={{
                                width: 200,
                            }}
                        />
                    </Col>
                </Row>
                <br />
                <Collapse defaultActiveKey={['1']} ghost items={itemsCollaps} />
            </div>
            <Drawer title="File Detail" placement="right" onClose={onClose} open={prevOpen}>
                <DrawerContent drawerData={drawerData}/>
            </Drawer>
        </>
    );
}

function DashboardItem({children}){
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar selectedKey={'1'} />
            <Layout>
                <HeaderHome />
                <Content
                    style={{
                        margin: '24px 16px 0',
                    }}
                >
                    {children}
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Smart DMS ©2023 Created by Antama Sinergi Persada
                </Footer>
            </Layout>
        </Layout>
    );
}
export default DashboardComponent;