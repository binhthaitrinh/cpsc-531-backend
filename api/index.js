const express = require("express");
const participant = require("./participant/participant.routes");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "api" });
});

router.use("/participants", participant);

module.exports = router;
