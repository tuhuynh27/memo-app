import React, { Component } from "react";
import "./LandingPage.scss";
import { enquireScreen } from "enquire-js";
import { Link } from "react-router-dom";
import Helmet from "react-helmet-async";

import QueueAnim from "rc-queue-anim";
import TweenOne from "rc-tween-one";
import { Button, Icon } from "antd";
import { OverPack } from "rc-scroll-anim";

import Header from "./Header";

let isMobile;

enquireScreen(b => {
  isMobile = b;
});

class LandingPage extends Component {
  state = {
    isMobile: typeof window === "undefined" ? false : isMobile
  };

  componentDidMount() {
    enquireScreen(b => {
      this.setState({
        isMobile: !!b
      });
    });
  }

  render() {
    const { isMobile } = this.state;

    return (
      <React.Fragment>
        <Helmet>
          <title>Memo App</title>
        </Helmet>
        <Header />
        <div className="banner-wrapper">
          {isMobile && (
            <TweenOne
              animation={{ opacity: 1 }}
              className="banner-image-wrapper"
            >
              <div className="home-banner-image">
                <img alt="banner" src="/assets/images/index.png" width="100%" />
              </div>
            </TweenOne>
          )}
          <QueueAnim
            className="banner-title-wrapper"
            type={isMobile ? "bottom" : "right"}
          >
            <div key="line" className="title-line-wrapper">
              <div
                className="title-line"
                style={{ transform: "translateX(-64px)" }}
              />
            </div>
            <img
              src="/assets/images/icw.png"
              alt="Memo App"
              style={{ maxWidth: "250px" }}
            />
            <div key="button" className="button-wrapper">
              <Link to="/home">
                <Button size="large" type="default">
                  <Icon type="bulb" />
                  View my memos
                </Button>
              </Link>
            </div>
          </QueueAnim>
          {!isMobile && (
            <TweenOne
              animation={{ opacity: 1 }}
              className="banner-image-wrapper"
            >
              <img alt="banner" src="/assets/images/index.png" width="100%" />
            </TweenOne>
          )}
        </div>
        <div className="home-page page2" hidden={isMobile}>
          <div className="home-page-wrapper">
            <div className="title-line-wrapper page2-line">
              <div className="title-line" />
            </div>
            <h2>
              ICW <span>Memo App</span>
              <Icon type="down" />
            </h2>
            <OverPack>
              <QueueAnim
                key="queue"
                type="bottom"
                leaveReverse
                className="page2-content"
              >
                <p key="p" className="page-content">
                  Source code is on Github
                </p>
                <div key="code1" className="home-code">
                  <div>
                    <div>
                      $ <span>git clone</span>{" "}
                      git@github.com/huynhminhtufu/memo-app.git
                    </div>
                    <div>$ cd memo-app</div>
                    <div>$ docker-compose up</div>
                  </div>
                </div>
                <div key="button" style={{ marginTop: "2rem" }}>
                  <a
                    href="https://github.com/huynhminhtufu/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button type="primary">
                      <Icon type="github" />
                      View repository on Github
                    </Button>
                  </a>
                </div>
              </QueueAnim>
            </OverPack>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LandingPage;
