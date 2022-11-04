const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./userRoutes");
const cors = require('cors');

const app = express();

mongoose
  .connect("mongodb+srv://tandin:Reskar@27@db.soqaf.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true})
  .then((_) => console.log("Connected to DB"))
  .catch((err) => console.error("error", err));


app.use(cors())
app.use(express.json());
app.use("/auth", userRoutes);

app.listen(8000, () => console.log("Running on port 8000"));
