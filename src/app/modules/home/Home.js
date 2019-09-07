import React, { Component } from "react";

import { Layout, Card, Row, Col, Divider, Icon } from "antd";
import { Link } from "react-router-dom";

import LocalStorageUtils from "@browser/LocalStorage";
import TimeAgo from "react-timeago";

const { Content } = Layout;
const { Meta } = Card;

class Home extends Component {
  state = {
    memos: LocalStorageUtils.getMemos()
  };

  renderMemos = () => {
    const { memos } = this.state;
    memos.sort((a, b) => b.time - a.time);

    return memos.map(memo => {
      return (
        <Col lg={8} md={12} key={memo.id}>
          <Card
            hoverable
            cover={
              <img
                src={memo.img || "https://source.unsplash.com/random/800x600"}
                style={{
                  objectFit: "cover",
                  height: "10rem"
                }}
              />
            }
            actions={[
              <Icon type="edit" key="edit" />,
              <Icon
                type="close"
                key="close"
                onClick={() => this.removeMemo(memo.id)}
              />,
              <TimeAgo date={memo.time} />
            ]}
            style={{ marginBottom: "1rem" }}
          >
            <Meta
              style={{
                height: "6rem",
                overflow: "hidden"
              }}
              title={memo.data.replace(/<(?:.|\n)*?>/gm, "")}
              description={memo.data.replace(/<(?:.|\n)*?>/gm, "")}
            />
          </Card>
        </Col>
      );
    });
  };

  removeMemo = memoID => {
    LocalStorageUtils.removeMemo(memoID);

    this.setState({
      memos: LocalStorageUtils.getMemos()
    });
  };

  render() {
    const { memos } = this.state;

    return (
      <Content className="content-container">
        <div className="content-wrapper">
          <Divider style={{ fontWeight: "lighter", fontSize: "1.5rem" }}>
            Memos
          </Divider>
          {memos && memos.length > 0 && (
            <Row gutter={16}>{this.renderMemos(memos)}</Row>
          )}
          {(!memos || memos.length <= 0) && (
            <div>
              You don't have any memo, let's{" "}
              <strong>
                <Link to="/create">create one</Link>
              </strong>
              !
            </div>
          )}
        </div>
      </Content>
    );
  }
}

export default Home;
