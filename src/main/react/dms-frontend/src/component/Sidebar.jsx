import { useState } from 'react';
import { Layout} from 'antd';
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
const { Sider } = Layout;

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
  
  const items = [
    getItem('Dashboard', '1', <PieChartOutlined />),
    getItem('Inbox', '2', <DesktopOutlined />),
    getItem('Projects', '3', <ContainerOutlined />),
    getItem('Projects', 'sub1', <MailOutlined />, [
      getItem('Partner', '5'),
      getItem('Accounting', '6'),
      getItem('Human Resource', '7'),
    ]),
    getItem('Admin Tools', 'sub2', <AppstoreOutlined />, [
      getItem('Manage Users', '9'),
      getItem('Manage User Groups', '10'),
      getItem('Manage User Groups', '11'),
      getItem('More Tools', 'sub3', null, [getItem('Tools 1', '12'), getItem('Tools 2', '13')]),
    ]),
  ];

const Sidebar = () =>{
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
      setCollapsed(!collapsed);
    };
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}
        >
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}
        />
        </Sider>
    )
}

  export default Sidebar;