const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./userRoutes");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();

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
  response.send("Health check! Alive");
});

app.use("/auth", userRoutes);

if (process.env.PROTOCOL == "https") {
  // Configuring HTTPs with TLS (Encryption)
  const secureServer = https.createServer(
    {
      key: fs.readFileSync(path.join(__dirname, "certificates", "key.pem")),
      cert: fs.readFileSync(path.join(__dirname, "certificates", "cert.pem")),
    },
    app
  );
  secureServer.listen(8000, () =>
    console.log("Secure server running on port 8000")
  );
} else if (process.env.PROTOCOL == "http") {
  app.listen(8000, () => console.log("Server running on port 8000"));
}
