import React, { useState } from 'react';
import { Layout, theme } from 'antd';
const {  Content, Footer } = Layout;
import { Col, Row } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Input, Drawer, Collapse, Button, message, Upload, Modal } from 'antd';
import * as d3 from "d3";
const { Search } = Input;
import Sidebar from './component/Sidebar'
import HeaderHome from './component/Header'
import CardItem from './component/CardItem'
import DrawerContent from './component/DrawerContent'
const { Dragger } = Upload;


const onSearch = (value, _e, info) => console.log(info?.source, value);

const props = {
  name: 'file',
  multiple: true,
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [prevOpen, setPrevOpen] = useState();
  const [drawerData, setDrawerData] = useState();
  const drawerOpen = (data, logic) => {
    setPrevOpen(logic)
    setDrawerData(data)
  }
  const onClose = () => {
    setPrevOpen(false);
  };
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
  },])
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
      label: element.month,
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
            <svg width={width} height={height}>
              <path fill="none" stroke="currentColor" stroke-width="1.5" d={line(data)} />
              <g fill="white" stroke="currentColor" stroke-width="1.5">
                {data.map((d, i) => (<circle key={i} cx={x(i)} cy={y(d)} r="2.5" />))}
              </g>
            </svg>
            <Row gutter={16}>
              <Col className="gutter-row" span={19}>
              <Button type="primary" onClick={showModal}>
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