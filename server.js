const next = require('next')
const express = require('express')
const path = require('path')
const compression = require('compression')
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const serviceWorker = app => (req, res) => {
  const filePath = path.resolve('./.next/service-worker.js');
  app.serveStatic(req, res, filePath);
};
app
  .prepare()
  .then(() => {
    const server = express();
    server.use(compression());
    process.setMaxListeners(0);
    server.get("/service-worker.js", serviceWorker(app));
    server.all("*", (req, res) => {
      res.set({
        'Content-Security-Policy':" script-src 'self' 'unsafe-inline' *.yaobaiyang.com"
      })
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
