import React, { Component } from "react";
import { EditorStyle } from "../shared/EditorStyle";

import { withRouter } from "react-router-dom";

import { Layout, Button, Icon, Skeleton, message } from "antd";

import LocalStorageUtils from "@browser/LocalStorage";
import getImage from "../../utils/common/getImage";
import { enquireScreen } from "enquire-js";
import queryString from "query-string";

const { Content } = Layout;

const CKEditor =
  typeof window !== "undefined" ? require("@ckeditor/ckeditor5-react") : null;
const ClassicEditor =
  typeof window !== "undefined"
    ? require("@ckeditor/ckeditor5-build-classic")
    : null;

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
      loading: false,
      isMobile: false
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

    try {
      const imageURL = await getImage(imgURL !== null);
      this.setState({ imgURL: imageURL });
    } catch (err) {
      console.log(err);
    }

    this.setState({ loading: false });
  };

  componentDidMount() {
    enquireScreen(b => {
      this.setState({
        isMobile: !!b
      });
    });
  }

  render() {
    const { isMobile, data, imgURL, loading } = this.state;

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
                  data={data}
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

export default withRouter(Edit);
