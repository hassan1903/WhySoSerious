import express from "express";
import cors from "cors";
import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { StaticRouter, matchPath } from "react-router-dom";
import serialize from "serialize-javascript";
import routes from "../helpers/routes";
import configureStore from "../helpers/configureStore";
import App from "../pages/App/App.js";
import "source-map-support/register";

const app = express();

app.use(cors());
app.use(express.static("public"));

app.get("*", (req, res, next) => {
  const store = configureStore();

  const promises = routes.reduce((acc, route) => {
    
    if (matchPath(req.url, route) && route.component && route.component.initialAction) {
      acc.push(Promise.resolve(store.dispatch(route.component.initialAction())));
    }
    return acc;
  }, []);

  Promise.all(promises)
    .then(() => {
      const context = {};
      const markup = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      );

      const initialData = store.getState();
      res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Batman Tv Shows</title>
            <link rel="stylesheet" href="/css/main.css">
            <script src="/bundle.js" defer></script>
            <script>window.__initialData__ = ${serialize(initialData)}</script>
          </head>

          <body>
            <div id="root">${markup}</div>
          </body>
        </html>
      `);
    })
    .catch(next);
});

app.listen(3000, () => {
  console.log("Server is listening");
});
