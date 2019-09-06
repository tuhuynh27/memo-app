import React from "react";

import { Layout, Skeleton } from "antd";

const { Content } = Layout;

function Home() {
  return (
    <Content className="content-container">
      <div className="content-wrapper">
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
      </div>
    </Content>
  );
}

export default Home;
