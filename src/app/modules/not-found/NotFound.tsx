import React from "react";
import Exception from "ant-design-pro/lib/Exception";
import { Link } from "react-router-dom";

import { Layout, Button } from "antd";

import Helmet from "react-helmet-async";

const { Content } = Layout;

function NotFound() {
  return (
    <Content className="content-container">
      <Helmet>
        <title>404 Not Found</title>
      </Helmet>
      <div
        style={{
          background: "#fff",
          padding: "2rem",
          textAlign: "center"
        }}
      >
        <Exception
          type="404"
          actions={
            <Link to="/">
              <Button type="primary">Go home</Button>
            </Link>
          }
          title="404"
          desc="This is page is not found."
        />
      </div>
    </Content>
  );
}

export default NotFound;
