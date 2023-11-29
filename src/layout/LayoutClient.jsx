import { Outlet } from "react-router-dom";
import HeaderClinet from "../components/Header";
import FooterClinet from "../components/Footer";
import { Layout } from "antd";

const { Header, Footer, Content } = Layout;

const LayoutClient = () => {
  return (
    <Layout>
      <Header style={{ background: "#E5E7E9" }}>
        <HeaderClinet />
      </Header>
      <Content>
        <Outlet />
      </Content>
      {/* <Footer
        style={{
          height: "5vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FooterClinet />
      </Footer> */}
    </Layout>
  );
};

export default LayoutClient;
