import React, { Component } from "react";
import { EditorStyle } from "../shared/EditorStyle";

import { withRouter } from "react-router-dom";

import { Layout, Button, Icon, Skeleton, message } from "antd";

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import uuid from "uuid";
import LocalStorageUtils from "@browser/LocalStorage";
import axios from "axios";
import { enquireScreen } from "enquire-js";

const { Content } = Layout;

let isMobile;

enquireScreen(b => {
  isMobile = b;
});

class Create extends Component {
  state = {
    data: null,
    imgURL: null,
    loading: false
  };

  saveMemo = () => {
    this.success();
  };

  success = () => {
    message.loading("Action in progress..", 0.5).then(() => {
      const done = this.doSave();
      if (done) {
        message.success("Saved successfully!");
        this.props.history.push("/home");
      } else {
        message.error("Nothing to save!");
      }
    });
  };

  doSave = () => {
    const { data, imgURL } = this.state;
    if (!data || !data.trim()) {
      return false;
    }

    const memoObj = {
      data,
      time: new Date().getTime(),
      id: uuid.v4(),
      img: imgURL
    };

    LocalStorageUtils.addMemo(memoObj);

    return true;
  };

  componentDidMount() {
    this.getImg();
  }

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
    const { imgURL, loading } = this.state;

    return (
      <Content className="content-container">
        <div className="content-wrapper">
          <EditorStyle>
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
                data="<p>Write your memo here</p>"
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
          </EditorStyle>
        </div>
      </Content>
    );
  }
}

export default withRouter(Create);
