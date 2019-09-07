import React, { Component } from "react";
import { EditStyle } from "./editStyle";

import { withRouter } from "react-router-dom";

import { Layout, Button, Icon, Skeleton, message } from "antd";

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import uuid from "uuid";
import LocalStorageUtils from "@browser/LocalStorage";
import axios from "axios";
import { enquireScreen } from "enquire-js";
import queryString from "query-string";

const { Content } = Layout;

let isMobile;

enquireScreen(b => {
  isMobile = b;
});

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    const { location, history } = this.props;
    const params = queryString.parse(location.search);
    if (!params || !params.id) {
      history.push("/404");
      return;
    }

    const memoData = LocalStorageUtils.getMemoByID(params.id);
    if (!memoData) {
      history.push("/404");
      return;
    }

    this.state = {
      id: params.id,
      data: memoData.data,
      imgURL: memoData.img,
      loading: false
    };
  }

  saveMemo = () => {
    this.success();
  };

  success = () => {
    message.loading("Action in progress..", 0.5).then(() => {
      const done = this.doSave();
      if (done) {
        message.success("Saved successfully!");
        const { history } = this.props;
        history.push("/home");
      } else {
        message.error("Nothing to save!");
      }
    });
  };

  doSave = () => {
    const { id, data, imgURL } = this.state;
    if (!data || !data.trim()) {
      return false;
    }

    const memoObj = {
      data,
      time: new Date().getTime(),
      id: id,
      img: imgURL
    };

    LocalStorageUtils.saveMemo(memoObj);

    return true;
  };

  getImg = async () => {
    const { loading, imgURL } = this.state;
    if (loading) {
      return;
    }

    this.setState({ loading: true });

    if (imgURL !== null)
      await new Promise((resolve, _) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });

    try {
      const res = await axios.get("https://source.unsplash.com/random/800x200");
      this.setState({ imgURL: res.request.responseURL });
    } catch (err) {
      console.error(err);
    }

    this.setState({ loading: false });
  };

  render() {
    const { data, imgURL, loading } = this.state;

    return (
      <Content className="content-container">
        <div className="content-wrapper">
          <EditStyle>
            <div
              style={{
                width: "700px",
                marginBottom: "1rem",
                cursor: "pointer"
              }}
              hidden={isMobile}
            >
              <Skeleton loading={loading} active>
                <img
                  src={imgURL}
                  onClick={this.getImg}
                  style={{ maxWidth: "700px" }}
                />
              </Skeleton>
            </div>
            <div id="editor-area" style={{ maxWidth: "700px" }}>
              <CKEditor
                editor={ClassicEditor}
                data={data}
                onChange={(_, editor) => {
                  const data = editor.getData();
                  this.setState({ data });
                }}
              />
            </div>

            <Button
              type="primary"
              style={{ marginTop: "1rem" }}
              onClick={this.saveMemo}
              disabled={loading}
            >
              <Icon type="check" />
              Save this Memo
            </Button>
          </EditStyle>
        </div>
      </Content>
    );
  }
}

export default withRouter(Edit);
