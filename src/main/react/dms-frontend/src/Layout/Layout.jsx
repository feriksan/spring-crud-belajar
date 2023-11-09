import {Layout} from "antd";
const {  Content, Footer } = Layout;
import Sidebar from "../component/Navigation/Sidebar.jsx";
import HeaderHome from "../component/Navigation/Header.jsx";
import React from "react";

function LayoutMain({children, page}){
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar selectedKey={page} />
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

export default LayoutMain;