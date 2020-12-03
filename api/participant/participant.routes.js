const express = require("express");
const queries = require("./participant.queries");
const router = express.Router();

router.get("/", async (req, res) => {
  const participants = await queries.find();
  res.json(participants);
});

module.exports = router;
