const express = require("express");
const db = require("./db");
const api = require("./api");
const cors = require("cors");

const app = express();

const allowList = [
  "http://localhost:3000",
  "http://159.89.135.229:3000",
  "http://159.89.135.229",
];

const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (allowList.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Hello",
  });
});

app.use("/api/v1", api);

module.exports = app;
