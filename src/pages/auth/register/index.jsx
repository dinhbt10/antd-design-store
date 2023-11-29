import React, { useState } from "react";
import { Button, Form, Input, message, notification } from "antd";
import { postRegister } from "../../../services";
import { Link, useNavigate } from "react-router-dom";
import backGround from "../../../assets/manga-one-piece-wallpaper-preview.jpg";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const res = await postRegister(values);
    setLoading(false);
    if (res.data) {
      message.success("Đăng ký thành công!");
      navigate("/login");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: res.message,
        duration: 3,
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100wh",
        flexDirection: "column",
        backgroundColor: "rgb(242, 243, 244)",
        padding: 0,
        margin: 0,
        background: `url(${backGround})`,
        backgroundSize: "100% 100%",
      }}
    >
      <div style={{ background: "white", width: "30%", padding: "20px" }}>
        <h1 style={{ display: "block" }}>Đăng ký</h1>
        <Form
          name="basic"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 1000,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            labelCol={{ span: 24 }}
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            label="Fullname"
            name="fullName"
            rules={[
              {
                required: true,
                message: "Please input your fullName!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password autoComplete="off" />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 24,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: "10px",
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{ background: "#4096ff" }}
              >
                Đăng ký
              </Button>
              <span style={{ paddingLeft: "50%" }}>Or</span>
              <div
                style={{ display: "flex", flexDirection: "row", gap: "10px" }}
              >
                <span>Bạn đã có tài khoản?</span>
                <Link to="/login" className="text-[#3498DB] font-bold">
                  Đăng nhập
                </Link>
              </div>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RegisterPage;
