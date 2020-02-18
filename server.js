const next = require('next')
const express = require('express')
const path = require('path')
const compression = require('compression')
const helmet = require('helmet')
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
    server.use(
      helmet.contentSecurityPolicy({
        directives: {
          defaultSrc: ["'self'", "*.yaobaiyang.com"],
          scriptSrc: ["'self'", "'unsafe-inline'"],
          sandbox: ["allow-forms", "allow-scripts"],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: true
        }
      })
    );
    server.use((req, res, next) => {
      res.setHeader("Content-Security-Policy", "frame-ancestors 'none'");
      res.setHeader("X-XSS-Protection", 1);
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.setHeader("Referrer-Policy", "same-origin");
      res.setHeader("X-Frame-Options", "Deny");
      next();
    });
    process.setMaxListeners(0);
    // server.get("/service-worker.js", serviceWorker(app));
    server.all("*", (req, res) => {
     
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
