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
    Row, Space, Select
} from 'antd';
const {  Content, Footer } = Layout;
const { Dragger } = Upload;
const { Search } = Input;
import {
    InboxOutlined,
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
        let dataList = []
        data.forEach(element => {
            const metadataList = [];
            const fileList = [];
            element.fileHistories.forEach(file => {
                file.fileMetadata.forEach(metadata => {
                    metadataList.push(metadata)
                })
                let files = {
                    "filename": file.filePath,
                    "fileSize": "10Gb",
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
            console.log(dataCard)
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
        console.log("MAsuk")
        const login = localStorage.getItem('isLogin');
        if(login === "login"){
            this.setState({
                isLogin:true,
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("Cek Login")
        console.log(this.state.isLogin)
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
    const [progress, setProgress] = useState(0);
    const [files, setFiles] = useState();
    let [metadata, setMetadata] = useState([]);

    const formHandler = (data) =>{
        const formData = new FormData();
        const metadataJson = {
            metadata:[]
        }
        metadata.map(element =>{
            let json = {
                metadata_key: element,
                metadata_value: data[element]
            }
            metadataJson.metadata.push(json)
        })
        const subfolder = "test3";
        formData.append("file", files);
        formData.append("metadata", JSON.stringify(metadataJson));
        formData.append("subfolder", subfolder);
        api
            .addFile(formData)
            .then(response => console.log(response.data))
        // axios({
        //     method: 'post',
        //     url: urlNewFile,
        //     data: formData,
        //     headers: {
        //         "Authorization": "Bearer " + tokenAPI,
        //     },
        //     onUploadProgress: event => {
        //         const percent = Math.floor((event.loaded / event.total) * 100);
        //         setProgress(percent);
        //         if (percent === 100) {
        //             setTimeout(() => setProgress(0), 1000);
        //         }
        //         // onProgress({percent: (event.loaded / event.total) * 100});
        //     }
        // })
        //     .then(function (response) {
        //         // onSuccess("Ok");
        //         console.log(response);
        //     })
        //     .catch(function (response) {
        //         const error = new Error("Some error");
        //         // onError({error});
        //         console.log(response);
        //     });
    }

    const props = {
        name: 'file',
        multiple: true,
        customRequest(info) {
            const {
                file,
                onProgress
            } = info;
            setFiles(file)
            const percent = Math.floor((event.loaded / event.total) * 100);
            setProgress(percent);
            if (percent === 100) {
                setTimeout(() => setProgress(0), 1000);
            }
            onProgress({percent: (event.loaded / event.total) * 100});
        }
    };
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
        // const cardItem = [
        //     <Row gutter={16}>
        //         {
        //             element.data.map(cardData => {
        //                 return <CardItem triggerDrawer={drawerOpen} data={cardData}/>
        //             })
        //         }
        //     </Row>
        // ];
        const cardItemNotGroupItem = [
            element.data.map(cardData => {
                return <CardItem triggerDrawer={drawerOpen} data={cardData}/>
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
                        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <Form
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
                                <Form.Item label="Dragger">
                                    <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
                                        <Dragger {...props}>
                                            <p className="ant-upload-drag-icon">
                                                <InboxOutlined />
                                            </p>
                                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                            <p className="ant-upload-hint">
                                                Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                                                banned files.
                                            </p>
                                        </Dragger>
                                    </Form.Item>
                                </Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
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