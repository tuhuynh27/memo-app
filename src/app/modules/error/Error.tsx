import React, { Component } from "react";
import Exception from "ant-design-pro/lib/Exception";
import { Link } from "react-router-dom";

import { Layout, Button, message } from "antd";

import Helmet from "react-helmet-async";

const { Content } = Layout;

interface ErrorProps {
  error: string;
}

function report(): void {
  message.info("Reported to developers");
}

function Error(props: ErrorProps) {
  const { error } = props;

  const msg: string = `There was an error: "${error}"`;

  return (
    <Content className="content-container">
      <Helmet>
        <title>Error</title>
      </Helmet>
      <div
        style={{
          background: "#fff",
          padding: "2rem",
          textAlign: "center"
        }}
      >
        <Exception
          type="500"
          actions={
            <Link to="/medium">
              <Button type="primary" onClick={report}>
                Report to developer team
              </Button>
            </Link>
          }
          title="500"
          desc={msg}
        />
      </div>
    </Content>
  );
}

export default Error;
