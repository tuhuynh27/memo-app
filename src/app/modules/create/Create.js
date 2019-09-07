import React, { Component } from "react";
import { EditorStyle } from "../shared/EditorStyle";

import { withRouter } from "react-router-dom";

import { Layout, Button, Icon, Skeleton, message } from "antd";

import uuid from "uuid";
import LocalStorageUtils from "@browser/LocalStorage";
import getImage from "../../utils/common/getImage";
import { enquireScreen } from "enquire-js";

const { Content } = Layout;

const CKEditor =
  typeof window !== "undefined" ? require("@ckeditor/ckeditor5-react") : null;
const ClassicEditor =
  typeof window !== "undefined"
    ? require("@ckeditor/ckeditor5-build-classic")
    : null;

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

    try {
      const imageURL = await getImage(imgURL !== null);
      this.setState({ imgURL: imageURL });
    } catch (err) {
      console.log(err);
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
              {typeof window !== "undefined" && (
                <CKEditor
                  editor={ClassicEditor}
                  data="<p>Write your memo here</p>"
                  onChange={(_, editor) => {
                    const data = editor.getData();
                    this.setState({ data });
                  }}
                />
              )}
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
