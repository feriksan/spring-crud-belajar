import React, { useState } from 'react';
import { Layout, theme } from 'antd';
const {  Content, Footer } = Layout;
import { Col, Row } from 'antd';
import { Input, Drawer, Collapse } from 'antd';
const { Search } = Input;
import Sidebar from './component/Sidebar'
import HeaderHome from './component/Header'
import CardItem from './component/CardItem'
import DrawerContent from './component/DrawerContent'

const onSearch = (value, _e, info) => console.log(info?.source, value);

const itemsCollaps = [
  {
    key: '1',
    label: 'August 2023',
    children: <CardItem />,
  },
  {
    key: '2',
    label: 'September 2023',
    children: [
      <Row gutter={16}>
        <CardItem />
        <CardItem />
      </Row>
      
    ],
  },
  {
    key: '3',
    label: 'October 2023',
    children: <CardItem />,
  },
];

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [prevOpen, setPrevOpen] = useState(open);
  const onClose = () => {
    setPrevOpen(false);
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
            <Row gutter={16}>
              <Col className="gutter-row" span={19}>
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
            <Collapse defaultActiveKey={['1']} ghost items={itemsCollaps} />
          </div>
          <Drawer title="File Name" placement="right" onClose={onClose} open={prevOpen}>
              <DrawerContent />
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