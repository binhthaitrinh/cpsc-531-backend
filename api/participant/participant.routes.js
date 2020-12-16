const express = require("express");
const queries = require("./participant.queries");
const router = express.Router();

router.get("/", async (req, res) => {
  const participants = await queries.find();
  res.json(participants);
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const participant = await queries.get(parseInt(id, 10));

    if (participant) {
      return res.json(participant);
    }

    return next();
  } catch (err) {
    console.log(err);
  }
});

router.patch("/:id/updatePosition", async (req, res, next) => {
  const { id } = req.params;

  try {
    const newParticipant = await queries.updatePosition(id, req.body);

    if (newParticipant) {
      return res.json({ newParticipant });
    }

    return next();
  } catch (err) {
    console.log(err);
    next();
  }
});

router.patch("/:id/updateContact", async (req, res, next) => {
  const { id } = req.params;

  try {
    const newParticipant = await queries.updateContact(
      parseInt(id, 10),
      parseInt(req.body.contactType, 10),
      req.body.url
    );

    if (newParticipant) {
      return res.json({ newParticipant });
    }

    return next();
  } catch (err) {
    console.log(err);
    next();
  }
});

router.patch("/:id/updateMe", async (req, res, next) => {
  console.log("call");
  const { id } = req.params;

  try {
    const newParticipant = await queries.updateMe(
      parseInt(id, 10),
      req.body.url
    );

    if (newParticipant) {
      return res.json({ newParticipant });
    }

    return next();
  } catch (err) {
    console.log(err);
    next();
  }
});

router.patch("/:id/insertContact", async (req, res, next) => {
  const { id } = req.params;

  try {
    const newParticipant = await queries.insertContact(
      parseInt(id, 10),
      req.body
    );

    if (newParticipant) {
      return res.json({ newParticipant });
    }

    return next();
  } catch (err) {
    console.log(err);
    next();
  }
});

router.patch("/:id/updateProfile", async (req, res, next) => {
  const { id } = req.params;

  try {
    const newParticipant = await queries.updateProfile(
      parseInt(id, 10),
      req.body
    );

    if (newParticipant) {
      return res.json({ newParticipant });
    }

    return next();
  } catch (err) {
    console.log(err);
    next();
  }
});

module.exports = router;
