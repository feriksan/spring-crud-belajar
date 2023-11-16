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
    UploadOutlined,
} from '@ant-design/icons';
import Sidebar from '../../component/Navigation/Sidebar.jsx'
import HeaderHome from '../../component/Navigation/Header.jsx'
import CardItem from '../../component/CardItem'
import DrawerContent from '../../component/DrawerContent'
import Login from "../../Page/Auth/Login.jsx";

import API from "../../helper/API.js";
import CardItemFolder from "../../component/CardItemFolder.jsx";
import '../../assets/disableStyleSelection.css'
import FileParser from '../../helper/FileDataParser.js'
const onSearch = (value, _e, info) => console.log(info?.source, value);
const api = new API()
const fileParser = new FileParser()
class DashboardComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
            fileArray: null,
            folderArray:null,
            error:true,
            loading:true,
            isLogin:false,
            dataApis:null,
            dirLevel:1
        };
    }

    async getFiles(){
        let listFile;
        let listFolder;
        await api
            .getFileAndDir(this.state.dirLevel)
            .then((response) => {
                listFile = response.data.File
                listFolder = response.data.Folder
            })
        this.renderList(listFile, listFolder)
    }

    renderList = (dataFile, dataFolder) =>{
        // const unique = [...new Set(data.map(item => item.subfolder))];
        // this.setState({folderArray:unique})
        const dataList = fileParser.parseFileData(dataFile);
        // dataFile.forEach(element => {
        //     const metadataList = [];
        //     const fileList = [];
        //     element.fileHistories.forEach(file => {
        //         file.fileMetadata.forEach(metadata => {
        //             metadataList.push(metadata)
        //         })
        //         let files = {
        //             "id":element.id,
        //             "filename": file.filePath,
        //             "subfolder":element.subfolder,
        //             "fileSize": element.fileSize + element.fileSizeUnit,
        //             "dateCreated": file.date_created,
        //             "metadata": metadataList
        //         }
        //         fileList.push(files)
        //     })
        //     const dataCard = {
        //         "owner": element.fileHistories[0].owner,
        //         "data": fileList
        //     };
        //     dataList.push(dataCard)
        // })
        this.setState(
            {
                fileArray:dataList,
                folderArray:dataFolder
            }
        )
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
        const {isLogin, loading, fileArray, folderArray} = this.state;
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
            <ContentDashboard fileArray={fileArray} folderArray={folderArray}/>
        </DashboardItem>
    }
}

function ContentDashboard(fileArray){
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    const [folderListState, setFolderListState] = useState(fileArray.folderArray)
    const [fileListState, setFileListState] = useState(fileArray.fileArray)
    const [fileInsideFolderListState, setFileInsideFolderListState] = useState(null)
    const [prevOpen, setPrevOpen] = useState();
    const [drawerData, setDrawerData] = useState();
    const [files, setFiles] = useState();
    let [metadata, setMetadata] = useState([]);
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [form] = Form.useForm();
    const [formFolder] = Form.useForm();
    const [currDir, setCurrDir] = useState(0)
    const [currDirPath, setCurrDirPath] = useState("")

    const reloadFolder = (dataBaru, changeDir, dirpath) => {
        setFileInsideFolderListState(fileParser.parseFileData(dataBaru.data))
        setCurrDirPath(dirpath)
        setCurrDir(changeDir)
    }

    const addFolder = (data) => {
        console.log(data)
        const folder = {
            "folder":data.directoryName
        }
        api
            .addFolder(folder)
            .then(response => {
                var folderListNew = []
                folderListNew = folderListState
                folderListNew.push(response.data)
                setFolderListState(folderListNew)
                formFolder.resetFields();
                {handleFolderCancel()}
                message.success('Create Directory Succesfull')
            })
            .catch((e) => {
                console.log(e)
                message.error('Create Directory Failed: ' + e.response.data)
            })
    }

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
        const subfolder = currDirPath;
        formData.append("file", files);
        formData.append("fileSize", files.size)
        formData.append("folder", currDir)
        formData.append("fileSizeUnit", "Kb")
        formData.append("metadata", JSON.stringify(metadataJson));
        formData.append("subfolder", subfolder);
        api
            .addFile(formData)
            .then(response => {
                console.log("Data masuk")
                console.log(response.data)
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
    const onFolderInsertFinish = (value) => {
        addFolder(value)
        console.log('Received values of form: ', value);
    }
    var itemsCollaps = [];
    var itemsCollapsFolder = [];
    var itemsCollapsFile = [];
    var count = 1;
    let cardItemNotGroup = [];
    let cardItemFolder = [];
    let cardItemFileInsideFolder = [];
    if(fileInsideFolderListState!=null){
        fileInsideFolderListState.forEach(element => {
            const cardItemNotGroupItem = [
                element.data.map(cardData => {
                    return <CardItem triggerDrawer={drawerOpen} data={cardData} id={count}/>
                })
            ]
            cardItemFileInsideFolder .push(cardItemNotGroupItem)
            count++
        });
        const itemObjectFile = {
            key: count,
            label: "File",
            children: [
                <Row>
                    {cardItemFileInsideFolder}
                </Row>
            ],
        }
        itemsCollapsFile.push(itemObjectFile)
    }
    fileListState.forEach(element => {
        const cardItemNotGroupItem = [
            element.data.map(cardData => {
                return <CardItem triggerDrawer={drawerOpen} data={cardData} id={count}/>
            })
        ]
        cardItemNotGroup.push(cardItemNotGroupItem)
        count++
    });
    folderListState.forEach(element => {
        cardItemFolder.push(<CardItemFolder triggerDrawer={reloadFolder} data={element} id={count}/>)
        count++
    });

    const itemObject = {
        key: count,
        label: "File",
        children: [
            <Row>
                {cardItemNotGroup}
            </Row>
        ],
    };

    const itemObjectFolder = {
        key: count,
        label: "Folder",
        children: [
            <Row>
                {cardItemFolder}
            </Row>
        ],
    };
    itemsCollaps.push(itemObject)
    itemsCollapsFolder.push(itemObjectFolder)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalFolderOpen, setIsModalFolderOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const showFolderModal = () => {
        setIsModalFolderOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleFolderOk = () => {
        setIsModalFolderOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleFolderCancel = () => {
        setIsModalFolderOpen(false);
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
                        <Row gutter={16}>
                            <Col>
                                <Button type="primary" onClick={showModal}>
                                    New File
                                </Button>
                            </Col>
                            <Col>
                                <Button type="primary" onClick={showFolderModal}>
                                    New Directory
                                </Button>
                            </Col>
                        </Row>
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
                                <Button type="primary" htmlType="submit" loading={uploading} disabled={fileList.length === 0}>
                                    {uploading ? 'Uploading' : 'Start Upload'}
                                </Button>
                            </Form>
                        </Modal>
                        <Modal title="Basic Modal" open={isModalFolderOpen} onOk={handleFolderOk} onCancel={handleFolderCancel} footer={null}>
                            <Form
                                form={formFolder}
                                onFinish={onFolderInsertFinish}
                            >
                                <Form.Item
                                    label="Directory"
                                    name="directoryName"
                                >
                                    <Input />
                                </Form.Item>
                                <Button type="primary" htmlType="submit" loading={uploading}>
                                    Create Dir
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
                {/*{itemsCollapsFile.length !== 0 ? itemsCollapsFile.children: itemsCollapsFolder.children.map(element => {*/}
                {/*    console.log(element)*/}
                {/*})}*/}
                {/*<Collapse defaultActiveKey={['1']} ghost items={itemsCollapsFile} className="disable-text-selection" />*/}
                <div>
                    <Collapse defaultActiveKey={['1']} ghost items={itemsCollapsFile.length !== 0 ? itemsCollapsFile: itemsCollapsFolder} className="disable-text-selection" />
                </div>
                {/*<Collapse defaultActiveKey={['1']} ghost items={itemsCollaps} className="disable-text-selection" />*/}
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