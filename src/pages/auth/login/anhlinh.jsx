import React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const categories = [
  (automationComponents = [
    {
      title: "Trục Dẫn Hướng",
      linkAvatar:
        "https://vn.misumi-ec.com/linked/material/mech/category/M0101000000.jpg?$category_first$",
    },
    {
      title: "Gối Đỡ Trục",
      linkAvatar:
        "https://vn.misumi-ec.com/linked/material/mech/category/M0102000000.jpg?$category_first$",
    },
    {
      title: "Vòng Cổ Trục",
      linkAvatar:
        "https://vn.misumi-ec.com/linked/material/mech/category/M0103000000.jpg?$category_first$",
    },
    {
      title: "Bạc Dẫn Hướng",
      linkAvatar:
        "https://vn.misumi-ec.com/linked/material/mech/category/M0104000000.jpg?$category_first$",
    },
    {
      title: "Trục Dẫn Hướng Có Bi",
      linkAvatar:
        "https://vn.misumi-ec.com/linked/material/mech/category/M0105000000.jpg?$category_first$",
    },
    {
      title: "Trục Dẫn Hướng Chống Xoay",
      linkAvatar:
        "https://vn.misumi-ec.com/linked/material/mech/category/M0106000000.jpg?$category_first$",
    },
    {
      title: "Bạc, Đệm Tự Bôi Trơn",
      linkAvatar:
        "https://vn.misumi-ec.com/linked/material/mech/category/M0107000000.jpg?$category_first$",
    },
    {
      title: "Tấm Tự Bôi Trơn, Ray Dẫn Hướng",
      linkAvatar:
        "https://vn.misumi-ec.com/linked/material/mech/category/M0108000000.jpg?$category_first$",
    },
    {
      title: "Thanh Trượt Dẫn Hướng",
      linkAvatar:
        "https://vn.misumi-ec.com/linked/material/mech/category/M0110000000.jpg?$category_first$",
    },
    {
      title: "Máng Cáp Đi Dây Điện",
      linkAvatar:
        "https://vn.misumi-ec.com/linked/material/mech/category/M0112000000.jpg?$category_first$",
    },
  ]),
];

const Login = () => {
  const clinetId =
    "732158095404-9fjtq1lqp4n8fho0l55h8nrpas2d915n.apps.googleusercontent.com";

  const onSuccess = (res) => {
    const USER_CREDENTIAL = jwtDecode(res.credential);
  };
  const onFailure = (res) => {};

  return (
    <>
      <GoogleOAuthProvider clientId={clinetId}>
        <GoogleLogin
          onSuccess={onSuccess}
          onFailure={onFailure}
          buttonText="Login google"
          cookiePolicy="single_host_origin"
        />
      </GoogleOAuthProvider>
    </>
  );
};

export default Login;
