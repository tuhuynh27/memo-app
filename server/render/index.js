import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Loadable from "react-loadable";
import { getBundles } from "react-loadable/webpack";
import Engine from "../engine";
import Main from "../../src/app/Main";

const stats = require("../../dist/react-loadable.json");

function renderer(app, store) {
  app.get("*", renderApp(store));
}

const renderApp = () => async (req, res) => {
  let context = {};
  let helmetContext = {};
  let modules = [];

  const html = renderToString(
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <StaticRouter location={req.url} context={context}>
        <HelmetProvider context={helmetContext}>
          <Main />
        </HelmetProvider>
      </StaticRouter>
    </Loadable.Capture>
  );

  let bundles = getBundles(stats, modules);

  res.send(
    Engine({
      html,
      helmet: helmetContext.helmet,
      bundles
    })
  );
};

export default renderer;
