import { Button, Form, Input, message, notification } from "antd";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postLogin } from "../../../services";
import { useDispatch } from "react-redux";
import { dologinAction } from "../../../redux/authSlice/authSlice";
import backGround from "../../../assets/manga-one-piece-wallpaper-preview.jpg";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const clinetId =
    "732158095404-9fjtq1lqp4n8fho0l55h8nrpas2d915n.apps.googleusercontent.com";

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

  const onSuccess = (res) => {
    const USER_CREDENTIAL = jwtDecode(res.credential);
  };

  const onFailure = (res) => {};

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
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{ background: "#4096ff" }}
              >
                Đăng nhập
              </Button>
              <GoogleOAuthProvider clientId={clinetId}>
                <GoogleLogin
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  buttonText="Login google"
                  cookiePolicy="single_host_origin"
                />
              </GoogleOAuthProvider>

              <span style={{ paddingLeft: "50%" }}>Or</span>
              <div
                style={{ display: "flex", flexDirection: "row", gap: "10px" }}
              >
                <span>Bạn chưa có tài khoản?</span>
                <Link to="/register" className="text-[#3498DB] font-bold">
                  Đăng ký
                </Link>
              </div>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
