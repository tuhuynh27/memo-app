import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { Row, Col, Icon, Menu, Button, Popover } from "antd";

import { enquireScreen } from "enquire-js";

class Header extends React.Component {
  state = {
    menuVisible: false,
    menuMode: "horizontal"
  };

  componentDidMount() {
    enquireScreen(b => {
      this.setState({ menuMode: b ? "inline" : "horizontal" });
    });
  }

  onMenuVisibleChange = visible => {
    this.setState({ menuVisible: visible });
  };

  render() {
    const { menuMode, menuVisible } = this.state;

    const menu = (
      <Menu mode={menuMode} defaultSelectedKeys={["home"]} id="nav" key="nav">
        <Menu.Item key="home">
          <Link to="/">Landing Page</Link>
        </Menu.Item>
        <Menu.Item key="app">
          <Link to="/home">Memo App</Link>
        </Menu.Item>
        <Menu.Item key="products">
          <a href="https://www.icw.io/en/supply-chain">
            <span>Our Products</span>
          </a>
        </Menu.Item>
        <Menu.Item key="about">
          <a href="https://www.icw.io/en/about-us">
            <span>About ICW</span>
          </a>
        </Menu.Item>
        {menuMode === "inline" && (
          <Menu.Item key="dollar">
            <a
              target="_blank"
              href="https://www.icw.io/en/pricing"
              rel="noopener noreferrer"
            >
              View Pricing
            </a>
          </Menu.Item>
        )}
      </Menu>
    );

    return (
      <div id="header" className="header">
        {menuMode === "inline" ? (
          <Popover
            overlayClassName="popover-menu"
            placement="bottomRight"
            content={menu}
            trigger="click"
            visible={menuVisible}
            arrowPointAtCenter
            onVisibleChange={this.onMenuVisibleChange}
          >
            <Icon
              className="nav-phone-icon"
              // onClick={this.handleShowMenu}
            />
          </Popover>
        ) : null}
        <Row>
          <Col xxl={20} xl={19} lg={16} md={16} sm={0} xs={0}>
            <div className="header-meta">
              <div id="preview">
                <a
                  id="preview-button"
                  target="_blank"
                  href="https://www.icw.io/en/pricing"
                  rel="noopener noreferrer"
                >
                  <Button icon="dollar">View Pricing</Button>
                </a>
              </div>
              {menuMode === "horizontal" ? <div id="menu">{menu}</div> : null}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Header;
