const express = require("express");
const mongoose = require("mongoose");
const next = require("next");
const compression = require("compression");
const cors = require("cors");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const config = require("config");
const MONGO_URI = config.get("mongoURI");
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch(err => {
    console.log(err.message);
    process.exit(1);
  });

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(compression());
    server.use(express.urlencoded({ extended: false }));
    server.options("*", cors());
    server.use(cors());
    server.use(express.json());
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
