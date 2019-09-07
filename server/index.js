import Loadable from "react-loadable";
import * as express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import morgan from "morgan";
import renderer from "./render";

const port = process.env.PORT || 3000;
const app = express();

function main() {
  injectMiddlewares(app);
  renderer(app);
  startServer(app, port);
}

function injectMiddlewares(app) {
  app.use(compression());
  app.use(bodyParser.json());

  app.use(morgan("combined"));

  app.use(function(_, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

    next();
  });

  app.use(
    express.static("dist", {
      maxAge: 86400
    })
  );

  app.use("/sw.js", express.static("dist/sw.js", { maxAge: 86400 }));

  app.use(
    "/assets",
    express.static("dist/assets", {
      maxAge: 86400
    })
  );
}

async function startServer(app, port) {
  try {
    await Loadable.preloadAll();
    app.listen(port, function() {
      console.log(`App listening on port ${port}!`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
