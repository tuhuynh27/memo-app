import React from "react";

import { Layout } from "antd";

const { Footer } = Layout;

function FooterPage() {
  return (
    <Footer
      style={{
        textAlign: "center"
      }}
    >
      <div>
        <strong>Memo App</strong>.<strong>com</strong> ©2019 Developed by{" "}
        <strong>
          <a href="https://mrhmt.com" target="_blank" rel="noopener noreferrer">
            Huynh Minh Tu
          </a>
        </strong>
        . Built on top of Node.js & React, hosted at Google Cloud Platform.
      </div>
    </Footer>
  );
}

export default FooterPage;
