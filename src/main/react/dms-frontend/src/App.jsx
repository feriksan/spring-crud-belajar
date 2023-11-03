import React, {Component, useState} from 'react';
import {Layout, theme, Skeleton, Switch, List, Avatar} from 'antd';
const {  Content, Footer } = Layout;
import { Col, Row } from 'antd';
import {InboxOutlined, LikeOutlined, MessageOutlined, StarOutlined} from '@ant-design/icons';
import { Input, Drawer, Collapse, Button, message, Upload, Modal } from 'antd';
const { Search } = Input;
import Sidebar from './component/Navigation/Sidebar.jsx'
import HeaderHome from './component/Navigation/Header.jsx'
import CardItem from './component/CardItem'
import DrawerContent from './component/DrawerContent'
const { Dragger } = Upload;
import axios from 'axios';

const onSearch = (value, _e, info) => console.log(info?.source, value);
const tokenAPI = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmZXJpa3NhbiIsImlhdCI6MTY5ODk5NDUyNywiZXhwIjoxNzAwNDM0NTI3fQ.d_WgS3IhSd7kdcsEaXY-R9zKEH_tMZIyjQ2AKgYM4Wk"
const urlGetFile = "http://localhost:99/api/v1/filedata/get_file_by_user";
const urlNewFile = "http://localhost:99/api/v1/filedata/create_new_file";

class AppComponent extends Component{
  constructor(props) {
    super(props);
    this.state = {
      fileArray: null,
      error:true,
      loading:true
    };
  }

  async getFiles(){
    this.setState({loading:true})

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

  componentDidMount() {
    this.getFiles();
  }

  render() {
    const {error, loading, fileArray} = this.state;
    if (loading) {
      return (
          <AppItem>
            <Skeleton active />
          </AppItem>
      )
    }
    // if (error) {
    //   return <div className="error">Something went wrong</div>;
    // }
    return <AppItem>
      <ContentDashboard fileArray={fileArray}/>
    </AppItem>
  }
}
// const IconText = ({ icon, text }) => (
//     <>
//       {React.createElement(icon, {
//         style: {
//           marginRight: 8,
//         },
//       })}
//       {text}
//     </>
// );
// function NotRendered({listData}){
//   const [loading, setLoading] = useState(true);
//   const onChange = (checked) => {
//     setLoading(!checked);
//   };
//   return (
//       <>
//         <Switch
//             checked={!loading}
//             onChange={onChange}
//             style={{
//               marginBottom: 16,
//             }}
//         />
//         <List
//             itemLayout="vertical"
//             size="large"
//             dataSource={listData}
//             renderItem={(item) => (
//                 <List.Item
//                     key={item.title}
//                     actions={
//                       !loading
//                           ? [
//                             <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
//                             <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
//                             <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
//                           ]
//                           : undefined
//                     }
//                     extra={
//                         !loading && (
//                             <img
//                                 width={272}
//                                 alt="logo"
//                                 src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
//                             />
//                         )
//                     }
//                 >
//                   <Skeleton loading={loading} active avatar>
//                     <List.Item.Meta
//                         avatar={<Avatar src={item.avatar} />}
//                         title={<a href={item.href}>{item.title}</a>}
//                         description={item.description}
//                     />
//                     {item.content}
//                   </Skeleton>
//                 </List.Item>
//             )}
//         />
//       </>
//   );
// }

function ContentDashboard(fileArray){
  const {
    token: {colorBgContainer},
  } = theme.useToken();
  const [prevOpen, setPrevOpen] = useState();
  const [drawerData, setDrawerData] = useState();
  const [progress, setProgress] = useState(0);

  const props = {
    name: 'file',
    multiple: true,
    customRequest(info) {
      const {onSuccess, onError, file, onProgress} = info;
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
      formData.append("file", file);
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
          onProgress({percent: (event.loaded / event.total) * 100});
        }
      })
          .then(function (response) {
            onSuccess("Ok");
            console.log(response);
          })
          .catch(function (response) {
            const error = new Error("Some error");
            onError({error});
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
    </>
  );
}
function AppItem({children}){
  const {
    token: {colorBgContainer},
  } = theme.useToken();

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
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
export default AppComponent;