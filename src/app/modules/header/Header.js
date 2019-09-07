import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu, Icon, Drawer } from "antd";
import LocalStorageUtils, { LOCAL_STORAGE_KEY } from "@browser/LocalStorage";

import { enquireScreen } from "enquire-js";

import { MobileStyle, HeaderStyle } from "./HeaderStyle";

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

    let currentKey = history.location.pathname;

    return (
      <HeaderStyle>
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
                theme="light"
                mode="inline"
                style={{ width: "100%", border: 0 }}
                onClick={this.onToggleMobileMenu}
              >
                <Menu.Item key="/home">
                  <Link to="/home">
                    <Icon type="folder" />
                    Memos
                  </Link>
                </Menu.Item>
                <Menu.Item key="/create">
                  <Link to="/create">
                    <Icon type="plus" />
                    Create New
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
                  <Icon type="folder" />
                  My Memo
                </Link>
              </Menu.Item>
              <Menu.Item key="/create">
                <Link to="/create">
                  <Icon type="plus" />
                  Create new Memo
                </Link>
              </Menu.Item>
            </Menu>
          </Header>
        )}
      </HeaderStyle>
    );
  }
}

export default withRouter(HeaderPage);
