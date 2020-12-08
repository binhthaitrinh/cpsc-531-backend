const express = require("express");
const participant = require("./participant/participant.routes");
const session = require("./session/session.routes");
const auth = require("./auth/auth.routes");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "api" });
});

router.use("/participants", participant);
router.use("/sessions", session);
router.use("/auth", auth);

module.exports = router;
