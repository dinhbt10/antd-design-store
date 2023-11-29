import React, { useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { FaRegAddressBook } from "react-icons/fa";
import { BsCartDash } from "react-icons/bs";
import { CiLogin } from "react-icons/ci";

import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  {
    label: <Link to="/admin">Dashboard</Link>,
    key: "dashboard",
    icon: <MdOutlineDashboard />,
  },
  {
    label: <Link>Users</Link>,
    icon: <FiUsers />,
    children: [
      {
        label: <Link to="/admin/users">AAAAAA</Link>,
        key: "a",
        icon: <FaRegAddressBook />,
      },
    ],
  },
  {
    label: <Link to="/admin/books">Book</Link>,
    key: "books",
    icon: <FaRegAddressBook />,
  },
  {
    label: <Link to="/admin/orders">Order</Link>,
    key: "orders",
    icon: <BsCartDash />,
  },
];
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="pt-16"
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <CiLogin onClick={() => navigate("/")} />
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: "100%",
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Design by dinh21
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
