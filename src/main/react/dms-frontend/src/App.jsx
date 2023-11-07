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
  Row} from 'antd';
const {  Content, Footer } = Layout;
const { Dragger } = Upload;
const { Search } = Input;
import {
  InboxOutlined,
  MinusCircleOutlined,
  PlusOutlined
} from '@ant-design/icons';
import Sidebar from './component/Navigation/Sidebar.jsx'
import HeaderHome from './component/Navigation/Header.jsx'
import CardItem from './component/CardItem'
import DrawerContent from './component/DrawerContent'
import Login from "./Page/Auth/Login.jsx";

import axios from 'axios';

const onSearch = (value, _e, info) => console.log(info?.source, value);
let tokenAPI = ""
const urlGetFile = "http://localhost:99/api/v1/filedata/get_file_by_user";
const urlNewFile = "http://localhost:99/api/v1/filedata/create_new_file";

class AppComponent extends Component{
  constructor(props) {
    super(props);
    this.state = {
      fileArray: null,
      error:true,
      loading:true,
      isLogin:false,
      token:null,
    };
  }

  async getFiles(){
    console.log("begin get file")
    const {token} = this.state;

    const response = await axios({
      method: 'get',
      url: urlGetFile,
      headers: {
        "Authorization": "Bearer " + tokenAPI,
      },
    })
    const dataList = [];
    response.data.forEach(element => {
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
      var dataCard = {
        "owner": element.fileHistories[0].owner,
        "data": fileList
      }
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
    tokenAPI = token
    localStorage.setItem('isLogin', "login");
    localStorage.setItem('token', token);
  }


  componentDidMount() {
    const login = localStorage.getItem('isLogin');
    const token = localStorage.getItem('token');
    tokenAPI = token
    if(login === "login"){
      this.setState({
        isLogin:true,
        token:token
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
          <AppItem>
            <Skeleton active />
          </AppItem>
      )
    }
    return <AppItem>
      <ContentDashboard fileArray={fileArray}/>
    </AppItem>
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

  const formHandler = (data) =>{
    console.log(data)
    const formData = new FormData();
    const metadata = {
      metadata: [
        {
          metadata_key: "JENIS_DOKUMEN",
          metadata_value: "ms.word"
        }
      ]
    };
    const subfolder = "test3";
    formData.append("file", files);
    formData.append("metadata", JSON.stringify(metadata));
    formData.append("subfolder", subfolder);
    axios({
      method: 'post',
      url: urlNewFile,
      data: formData,
      headers: {
        "Authorization": "Bearer " + tokenAPI,
      },
      onUploadProgress: event => {
            const percent = Math.floor((event.loaded / event.total) * 100);
            setProgress(percent);
            if (percent === 100) {
              setTimeout(() => setProgress(0), 1000);
            }
            // onProgress({percent: (event.loaded / event.total) * 100});
          }
    })
        .then(function (response) {
          // onSuccess("Ok");
          console.log(response);
        })
        .catch(function (response) {
          const error = new Error("Some error");
          // onError({error});
          console.log(response);
        });
  }

  const props = {
    name: 'file',
    multiple: true,
    customRequest(info) {
      const {
        // onSuccess,
        // onError,
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
      // const formData = new FormData();
      // const metadata = {
      //   metadata: [
      //     {
      //       metadata_key: "JENIS_DOKUMEN",
      //       metadata_value: "ms.word"
      //     }
      //   ]
      // };
      //
      // const subfolder = "test3";
      // console.log("Get File from function")
      // console.log(file)
      // formData.append("file", file);
      // formData.append("metadata", JSON.stringify(metadata));
      // formData.append("subfolder", subfolder);
      // console.log(formData)
      //
      // axios({
      //   method: 'post',
      //   url: urlNewFile,
      //   data: formData,
      //   headers: {
      //     "Authorization": "Bearer " + tokenAPI,
      //   },
      //   onUploadProgress: event => {
      //     const percent = Math.floor((event.loaded / event.total) * 100);
      //     setProgress(percent);
      //     if (percent === 100) {
      //       setTimeout(() => setProgress(0), 1000);
      //     }
      //     onProgress({percent: (event.loaded / event.total) * 100});
      //   }
      // })
      //     .then(function (response) {
      //       onSuccess("Ok");
      //       console.log(response);
      //     })
      //     .catch(function (response) {
      //       const error = new Error("Some error");
      //       onError({error});
      //       console.log(response);
      //     });
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
    const cardItem = [
      <Row gutter={16}>
        {
          element.data.map(cardData => {
            return <CardItem triggerDrawer={drawerOpen} data={cardData}/>
          })
        }
      </Row>
    ];
    const cardItemNotGroupItem = [
      element.data.map(cardData => {
        return <CardItem triggerDrawer={drawerOpen} data={cardData}/>
      })
    ]
    cardItemNotGroup.push(cardItemNotGroupItem)
    // const itemObject = {
    //   key: count,
    //   label: element.owner,
    //   children: cardItemNotGroup,
    // };
    // itemsCollaps.push(itemObject)
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
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };

  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };
  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
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
                <Form.List
                    name="names"
                    rules={[
                      {
                        validator: async (_, names) => {
                          if (!names || names.length < 2) {
                            return Promise.reject(new Error('please input metadata'));
                          }
                        },
                      },
                    ]}
                >
                  {(fields, { add, remove }, { errors }) => (
                      <>
                        {fields.map((field, index) => (
                            <Form.Item
                                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                                label={index === 0 ? 'Passengers' : ''}
                                required={false}
                                key={field.key}
                            >
                              <Form.Item
                                  {...field}
                                  validateTrigger={['onChange', 'onBlur']}
                                  rules={[
                                    {
                                      required: true,
                                      whitespace: true,
                                    },
                                  ]}
                                  noStyle
                              >
                                <Input placeholder="Metadata Value" style={{ width: '60%' }} />
                              </Form.Item>
                              {fields.length > 1 ? (
                                  <MinusCircleOutlined
                                      className="dynamic-delete-button"
                                      onClick={() => remove(field.name)}
                                  />
                              ) : null}
                            </Form.Item>
                        ))}
                        <Form.Item>
                          <Button
                              type="dashed"
                              onClick={() => add()}
                              style={{ width: '60%' }}
                              icon={<PlusOutlined />}
                          >
                            Add field
                          </Button>
                          <Form.ErrorList errors={errors} />
                        </Form.Item>
                      </>
                  )}
                </Form.List>
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
function AppItem({children}){
  return (
    <Layout style={{ minHeight: '100vh' }}>
        <Sidebar />
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
          Smary DMS ©2023 Created by Antama Sinergi Persada
        </Footer>
      </Layout>
    </Layout>
  );
}
export default AppComponent;