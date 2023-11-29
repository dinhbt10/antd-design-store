import React from "react";
import { Avatar, Badge, Col, Dropdown, Input, Row, Space, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doLogout } from "../../services";
import { doLogoutAction } from "../../redux/authSlice/authSlice";

const Header = () => {
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Search } = Input;

  const handleLogout = async () => {
    const res = await doLogout();
    if (res && res.data) {
      dispatch(doLogoutAction());
      message.success("Đăng xuất thành công");
      navigate("/");
    }
  };

  const items = [
    {
      label: <a href="https://www.antgroup.com">Quản lý tài khoản </a>,
      key: "0",
    },
    {
      label: <button onClick={handleLogout}>Đăng xuất</button>,
      key: "1",
    },
  ];

  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <>
      <Row align="middle" justify="center" wrap gutter={[16, 16]}>
        <Col>
          <div
            className="flex flex-row items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span className="text-3xl  text-[#5DADE2]">Đình 21</span>
          </div>
        </Col>
        <Col span={12}>
          <Search
            style={{ display: "flex" }}
            placeholder="Bạn tìm gì hôm nay"
            allowClear
            onSearch={onSearch}
          />
        </Col>
        <Col>
          <Badge count={99} overflowCount={10}>
            <Avatar
              size="large"
              icon={<AiOutlineShoppingCart />}
              alt="avatar"
              style={{
                color: "#5DADE2",
                background: "none",
                cursor: "pointer",
              }}
            />
          </Badge>
        </Col>
        <Col>
          {!localStorage.getItem("access_token") ? (
            <Avatar
              onClick={() => navigate("/login")}
              size="large"
              icon={<FaUserCircle />}
              alt="avatar"
              style={{
                paddingLeft: "20px",
                color: "black",
                background: "none",
                cursor: "pointer",
              }}
            />
          ) : (
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space style={{ paddingLeft: "20px", cursor: "pointer" }}>
                  Click me
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          )}
        </Col>
        {auth && auth?.user?.role === "ADMIN" && (
          <Link to="/admin">GO to Admin</Link>
        )}
      </Row>
    </>
  );
};

export default Header;
