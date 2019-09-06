import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import App from "./App";
import LandingPage from "./modules/landing-page/LandingPage";

class Main extends Component<{}> {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/*" component={App} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default Main;
