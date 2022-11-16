const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./userRoutes");
const imageRoutes = require("./imageRoutes");
const messageRoutes = require("./messageRoutes");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const path = require("path");
const {models} = require("mongoose");
require("dotenv").config();
const logger = require('./logger');
var toobusy = require('toobusy-js');

const app = express();

// middleware which blocks requests when we're too busy
app.use(function(req, res, next) {
  if (toobusy()) {
    logger.error(`High Server Load`)
    res.send(503, "I'm busy right now, sorry.");
  } else {
    next();
  }
});

mongoose
  .connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((_) => console.log("Connected to DB"))
  .catch((err) => console.error("error", err));

app.use(cors());
app.use(express.json());

// Default route
app.get("/", (request, response) => {
  response.send("Secure Backend Is Running!");
});

// Routers.
app.use("/auth", userRoutes);
app.use("/image", imageRoutes);
app.use("/message", messageRoutes);

// Limitting API request sizes - Security Optimization.
app.use(express.json({ limit: '10MB' }));

if (process.env.PROTOCOL === "https") {
  // Configuring HTTPs with TLS (Encryption)
  const secureServer = https.createServer(
    {
      key: fs.readFileSync(path.join(__dirname, "certificates", "key.pem")),
      cert: fs.readFileSync(path.join(__dirname, "certificates", "cert.pem")),
    },
    app
  );
  secureServer.listen(8000, () =>
    console.log("Secure server running on port 8000"),
    logger.info(`Secure server (HTTPs) started and running on http://localhost:8000`)
  );
} else if (process.env.PROTOCOL === "http") {
  app.listen(8000, () => console.log("Server running on port 8000"));
  logger.info(`Server (HTTP) started and running on http://localhost:8000`)
}

process.on('SIGINT', function() {
  server.close();
  // calling .shutdown allows your process to exit normally
  toobusy.shutdown();
  process.exit();
});

module.exports = app;
