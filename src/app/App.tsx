import React, { Component } from "react";
import "./App.scss";
import { Route, Switch, Link } from "react-router-dom";

import { Layout } from "antd";

import HeaderPage from "./modules/header/Header";
import FooterPage from "./modules/footer/Footer";
import Routes from "./Routes";
import NotFound from "./modules/not-found/NotFound";
import Error from "./modules/error/Error";

type Props = {
  location: Location;
};

type State = {
  hasError: boolean;
  errorText: string;
};

type Location = {
  pathname: string;
};

class App extends Component<Props, State> {
  state = {
    hasError: false,
    errorText: ""
  };

  static getDerivedStateFromError(error): State {
    return {
      hasError: true,
      errorText: error.toString()
    };
  }

  render() {
    const { hasError, errorText } = this.state;

    return (
      <Layout>
        <div
          style={{
            padding: "2rem",
            textAlign: "center",
            backgroundColor: "#000"
          }}
        >
          <Link to="/">
            <img
              src="/assets/images/icw_white.png"
              alt="Memo App"
              style={{
                width: "150px",
                padding: "1rem",
                background: "#36A4D8",
                borderRadius: "1rem"
              }}
            />
          </Link>
        </div>
        <HeaderPage />
        {hasError && <Error error={errorText} />}
        {!hasError && (
          <Switch>
            {Routes.map(route => {
              return (
                <Route
                  exact
                  path={route.path}
                  component={route.component}
                  key={route.path}
                />
              );
            })}
            <Route path="*" component={NotFound} />
          </Switch>
        )}
        <FooterPage />
      </Layout>
    );
  }
}

export default App;
