import React, { useState } from "react";
import { Button, Form, Input, message, notification } from "antd";
import { postRegister } from "../../../services";
import { Link, useNavigate } from "react-router-dom";

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
        height: "100%",
        padding: "50px",
        flexDirection: "column",
      }}
    >
      <h1 style={{ display: "block" }}>Đăng kí tài khoản</h1>
      <Form
        name="basic"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 16,
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
          label="FullName"
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
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Link to="/login">Đăng nhập</Link>
            <Button type="primary" htmlType="submit" loading={loading}>
              Đăng nhập
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPage;
