import { Button, Form, Input, message, notification } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postLogin } from "../../../services";
import { useDispatch } from "react-redux";
import { dologinAction } from "../../../redux/authSlice/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    setLoading(true);
    const res = await postLogin(values);
    setLoading(false);
    if (res.data) {
      localStorage.setItem("access_token", res.data.access_token);
      dispatch(dologinAction(res.data.user));
      message.success("Đăng nhập thành công!");
      navigate("/");
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
      }}
    >
      <div style={{ background: "white", width: "30%", padding: "20px" }}>
        <h1 style={{ display: "block" }}>Đăng nhập</h1>
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
            name="username"
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
              <Button type="primary" htmlType="submit" loading={loading}>
                Đăng nhập
              </Button>
              <span style={{ paddingLeft: "50%" }}>Or</span>
              <div
                style={{ display: "flex", flexDirection: "row", gap: "10px" }}
              >
                <span>Bạn chưa có tài khoản?</span>
                <Link to="/register">Đăng ký</Link>
              </div>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
