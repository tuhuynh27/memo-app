import React, { Component } from "react";
import "./Header.scss";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu, Icon, Drawer } from "antd";
import LocalStorageUtils, { LOCAL_STORAGE_KEY } from "@browser/LocalStorage";
import styled from "styled-components";
import { enquireScreen } from "enquire-js";

const MobileStyle = styled.div`
  .nav-phone-icon {
    cursor: pointer;
    display: none;
    height: 22px;
    position: absolute;
    left: 20px;
    top: 25px;
    width: 16px;
    z-index: 1;
  }

  .nav-phone-icon {
    display: block;
  }

  .nav-phone-icon::before {
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 6px 0 0 #fff, 0 12px 0 0 #fff;
    content: "";
    display: block;
    height: 2px;
    position: absolute;
    width: 20px;
  }
`;

const { Header } = Layout;

class HeaderPage extends Component {
  state = {
    desktop: true,
    mobileMenu: false
  };

  componentDidMount() {
    enquireScreen(b => {
      this.setState({ desktop: b ? false : true });
    });
  }

  onLogout = e => {
    e.preventDefault();

    LocalStorageUtils.removeItem(LOCAL_STORAGE_KEY.JWT);
    LocalStorageUtils.removeItem(LOCAL_STORAGE_KEY.EMAIL);
    const { history } = this.props;
    history.push("/login");
  };

  onToggleMobileMenu = () => {
    const { mobileMenu } = this.state;

    this.setState({
      mobileMenu: !mobileMenu
    });
  };

  render() {
    if (typeof window === "undefined") {
      return <div />;
    }

    const { history } = this.props;
    const { mobileMenu, desktop } = this.state;

    const currentKey = history.location.pathname;

    return (
      <React.Fragment>
        {!desktop && (
          <MobileStyle>
            <span
              className="nav-phone-icon"
              onClick={this.onToggleMobileMenu}
            />

            <Drawer
              placement="left"
              onClose={this.onToggleMobileMenu}
              visible={mobileMenu}
              closable={false}
            >
              <Menu
                theme="dark"
                mode="inline"
                style={{ width: "100%", border: 0 }}
                onClick={this.onToggleMobileMenu}
              >
                <Menu.Item key="/home">
                  <Link to="/home">
                    <Icon type="home" />
                    Home
                  </Link>
                </Menu.Item>
              </Menu>
            </Drawer>
          </MobileStyle>
        )}
        {desktop && (
          <Header>
            <Menu
              theme="light"
              mode="horizontal"
              style={{ lineHeight: "64px" }}
              selectedKeys={[currentKey]}
            >
              <Menu.Item key="/home">
                <Link to="/home">
                  <Icon type="home" />
                  Home
                </Link>
              </Menu.Item>
            </Menu>
          </Header>
        )}
      </React.Fragment>
    );
  }
}

export default withRouter(HeaderPage);
