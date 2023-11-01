import React, { useState } from 'react';
import { Layout, theme } from 'antd';
const {  Content, Footer } = Layout;
import { Col, Row } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Input, Drawer, Collapse, Button, message, Upload, Modal } from 'antd';
const { Search } = Input;
import Sidebar from './component/Navigation/Sidebar.jsx'
import HeaderHome from './component/Navigation/Header.jsx'
import CardItem from './component/CardItem'
import DrawerContent from './component/DrawerContent'
const { Dragger } = Upload;
import axios from 'axios';

const onSearch = (value, _e, info) => console.log(info?.source, value);

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [prevOpen, setPrevOpen] = useState();
  const [drawerData, setDrawerData] = useState();
  const [progress, setProgress] = useState(0);

  const props = {
    name: 'file',
    multiple: true,
    customRequest(info){
      const { onSuccess, onError, file, onProgress } = info;

      const config = {
        headers: {
          "content-type": "multipart/form-data",
          "Access-Control-Allow-Origin":"*"
        },
        onUploadProgress: event => {
          const percent = Math.floor((event.loaded / event.total) * 100);
          setProgress(percent);
          if (percent === 100) {
            setTimeout(() => setProgress(0), 1000);
          }
          onProgress({ percent: (event.loaded / event.total) * 100 });
        }
      };
      var formData = new FormData();


      var metadata = {
        metadata : [
          {
            metadata_key:"JENIS_DOKUMEN",
            metadata_value: "ms.word"
          }
        ]
      }

      var subfolder = "test3"
      formData.append("file", file);
      formData.append("metadata", JSON.stringify(metadata));
      formData.append("subfolder", subfolder);
      var url = "http://localhost:99/api/v1/filedata/create_new_file"

      var token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmZXJpa3NhbiIsImlhdCI6MTY5ODgwMTM3NiwiZXhwIjoxNjk4ODAyODE2fQ.0jaB0GFtTMtYOakE89NeJvDACC7z8U2xr7faG5F5Lks"

      axios({
        method: 'post',
        url: url,
        data: formData,
        headers: {
          "Authorization": "Bearer "+token,
        },
        onUploadProgress: event => {
          const percent = Math.floor((event.loaded / event.total) * 100);
          setProgress(percent);
          if (percent === 100) {
            setTimeout(() => setProgress(0), 1000);
          }
          onProgress({ percent: (event.loaded / event.total) * 100 });
        }
      })
          .then(function (response) {
            onSuccess("Ok");
            console.log(response);
          })
          .catch(function (response) {
            const error = new Error("Some error");
            onError({ err });
            console.log(response);
          });
    }
  };
  const drawerOpen = (data, logic) => {
    setPrevOpen(logic)
    setDrawerData(data)
  }
  const onClose = () => {
    setPrevOpen(false);
  };
  const getFile = async() => {
    var url = "http://localhost:99/api/v1/filedata/get_file_by_user"

    var token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmZXJpa3NhbiIsImlhdCI6MTY5ODgxMTE5OCwiZXhwIjoxNjk4ODEyNjM4fQ.KDorjEbzqnKT4ahb7AHbRUYQj450lzNHyWqwsmeNBOg"

    await axios({
      method: 'get',
      url: url,
      headers: {
        "Authorization": "Bearer "+token,
      },
    })
        .then(function (response) {
          setFileArray(response.data)
          console.log(response);
        })
        .catch(function (response) {
          const error = new Error("Some error");
          console.log(response);
        });
  }
  const [fileArray, setFileArray] = useState()
  var itemsCollaps = [];
  var count = 1;
  if(fileArray == undefined || fileArray == null || typeof fileArray == "undefined" || fileArray == "undefined"){
    fileArray.forEach(element => {
      const d = new Date(element.dateCreate);
      let month = d.getMonth();
      var cardItem = [
        <Row gutter={16}>
          {
            element.fileHistories[0].map(cardData => {
              return <CardItem triggerDrawer={drawerOpen} data={cardData}/>
            })
          }
        </Row>
      ]
      var itemObject = {
        key: count,
        label: element.month,
        children: cardItem,
      }
      itemsCollaps.push(itemObject)
      count++
    });
  }
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
          <div
            style={{
              padding: 24,
              minHeight: 500,
              background: colorBgContainer,
            }}
          >
            {/*<svg width={width} height={height}>*/}
            {/*  <path fill="none" stroke="currentColor" stroke-width="1.5" d={line(data)} />*/}
            {/*  <g fill="white" stroke="currentColor" stroke-width="1.5">*/}
            {/*    {data.map((d, i) => (<circle key={i} cx={x(i)} cy={y(d)} r="2.5" />))}*/}
            {/*  </g>*/}
            {/*</svg>*/}
            <Row gutter={16}>
              <Col className="gutter-row" span={19}>
              <Button type="primary" onClick={showModal}>
                New File
              </Button>
              <Button type="primary" onClick={getFile}>
                New File
              </Button>
              <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
          <Drawer title={drawerData} placement="right" onClose={onClose} open={prevOpen}>
              <DrawerContent drawerData={drawerData}/>
          </Drawer>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;