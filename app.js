const express = require("express");
const db = require("./db");
const api = require("./api");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello",
  });
});

app.use("/api/v1", api);

module.exports = app;
