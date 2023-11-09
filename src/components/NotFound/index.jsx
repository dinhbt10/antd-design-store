import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visied does not exist."
        extra={<Button onClick={() => navigate("/")}>Back home</Button>}
      />
    </>
  );
};

export default NotFound;
