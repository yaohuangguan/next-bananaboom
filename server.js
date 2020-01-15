const express = require("express");
const next = require("next");
const path = require("path");
const compression = require("compression");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const spdy = require("spdy");
const fs = require("fs");

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(compression());
    server.use(express.urlencoded({ extended: false }));
    server.use(express.json());
    process.setMaxListeners(0);
    server.get("/service-worker.js", (req, res) => {
      res.sendFile(path.resolve(__dirname, ".next", "/service-worker.js"));
    });
    server.all("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
