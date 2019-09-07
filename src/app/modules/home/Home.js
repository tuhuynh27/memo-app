import React, { Component } from "react";

import { Layout, Card, Row, Col, Divider, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";

import LocalStorageUtils from "@browser/LocalStorage";
import TimeAgo from "react-timeago";

const { Content } = Layout;
const { Meta } = Card;

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memos: typeof window !== "undefined" ? LocalStorageUtils.getMemos() : []
    };
  }

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
                onClick={() => this.editMemo(memo.id)}
              />
            }
            actions={[
              <Icon
                type="edit"
                key="edit"
                onClick={() => this.editMemo(memo.id)}
              />,
              <Icon
                type="close"
                key="close"
                onClick={() => this.removeMemo(memo.id)}
              />,
              <TimeAgo date={memo.time} />
            ]}
            style={{ marginBottom: "1rem" }}
          >
            <Link to={`/edit?id=${memo.id}`}>
              <Meta
                style={{
                  height: "6rem",
                  overflow: "hidden"
                }}
                title={memo.data.replace(/<(?:.|\n)*?>/gm, "")}
                description={memo.data.replace(/<(?:.|\n)*?>/gm, "")}
              />
            </Link>
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

  editMemo = memoID => {
    const { history } = this.props;

    history.push(`edit?id=${memoID}`);
  };

  render() {
    const { memos } = this.state;

    return (
      <Content className="content-container">
        <div className="content-wrapper">
          <Divider style={{ fontWeight: "lighter", fontSize: "1.5rem" }}>
            Memos
          </Divider>
          {memos && Array.isArray(memos) && memos.length > 0 && (
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

export default withRouter(Home);
