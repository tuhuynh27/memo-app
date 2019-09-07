import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Loadable from "react-loadable";
import { HelmetProvider } from "react-helmet-async";
import serverStyleCleanup from "node-style-loader/clientCleanup";
import Main from "./app/Main";

const AppBundle = (
  <BrowserRouter>
    <HelmetProvider>
      <Main />
    </HelmetProvider>
  </BrowserRouter>
);

Loadable.preloadReady()
  .then(() => ReactDOM.render(AppBundle, document.getElementById("root")))
  .catch(err => {
    console.log(err);
  });

// Hot reload
if (module.hot) {
  module.hot.accept();
}

serverStyleCleanup();
