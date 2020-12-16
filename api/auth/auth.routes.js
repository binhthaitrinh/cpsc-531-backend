const express = require("express");
const queries = require("./index");
const router = express.Router();
const db = require("../../db");

router.post("/login", async (req, res, next) => {
  console.log("asd");
  const { email, password } = req.body;
  try {
    const users = await db("Participant").where({ Login_ID: email }).select();
    const user = users[0];
    if (password === user.Password) {
      return res.json({ user });
    }

    res.json({ msg: "Wrong credentials" });
  } catch (err) {
    console.log(err);
    res.json({ msg: "error" });
  }
});

module.exports = router;
