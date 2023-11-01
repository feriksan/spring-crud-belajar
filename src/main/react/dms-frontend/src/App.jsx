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

    var token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmZXJpa3NhbiIsImlhdCI6MTY5ODgyMzkwMCwiZXhwIjoxNjk4ODI1MzQwfQ._vY6LZShptxNj3yrCcqlzbvBeB5xGPCJ53GekktU-4s"

    await axios({
      method: 'get',
      url: url,
      headers: {
        "Authorization": "Bearer "+token,
      },
    })
        .then(function (response) {
          var dataList = []
          response.data.forEach(element => {
            console.log(element)
            var metadataList = []
            var fileList = []
            element.fileHistories.forEach(file =>{
              file.fileMetadata.forEach(metadata =>{
                metadataList.push(metadata)
              })
              let files = {
                "filename":file.filePath,
                "fileSize":"10Gb",
                "dateCreated":file.date_created,
                "metadata":metadataList
              }
              fileList.push(files)
            })
            var dataCard = {
              "owner":element.fileHistories[0].owner,
              "data":fileList
            }
            dataList.push(dataCard)
          })
          console.log(dataList);
          console.log(fileArray)
          setFileArray(dataList)
        })
        .catch(function (response) {
          const error = new Error("Some error");
          console.log(response);
        });
  }
  const [fileArray, setFileArray] = useState([{
        "month":"August",
        "data":[{
          filename: 'file 1',
          fileSize: '20GB',
          dateCreate: '19 August 2023'
        },
          {
            filename: 'file 2',
            fileSize: '67GB',
            dateCreate: '18 August 2023'
          }]
      },
        {
          "month":"July",
          "data":[{
            filename: 'file 2',
            fileSize: '15GB',
            dateCreate: '5 July 2023'
          },]
        },
        {
          "month":"September",
          "data":[{
            filename: 'file 3',
            fileSize: '30GB',
            dateCreate: '12 September 2023'
          },]
        },
        {
          "month":"June",
          "data":[{
            filename: 'file 4',
            fileSize: '10GB',
            dateCreate: '8 June 2023'
          },]
        },
        {
          "month":"October",
          "data":[{
            filename: 'file 5',
            fileSize: '25GB',
            dateCreate: '27 October 2023'
          },]
        },]
  )
  var itemsCollaps = [];
  var count = 1;
  fileArray.forEach(element => {
    const d = new Date(element.dateCreate);
    let month = d.getMonth();
    var cardItem = [
      <Row gutter={16}>
        {
          element.data.map(cardData => {
            return <CardItem triggerDrawer={drawerOpen} data={cardData}/>
          })
        }
      </Row>
    ]
    var itemObject = {
      key: count,
      label: element.owner,
      children: cardItem,
    }
    itemsCollaps.push(itemObject)
    count++
  });
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
          <Drawer title="File Detail" placement="right" onClose={onClose} open={prevOpen}>
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