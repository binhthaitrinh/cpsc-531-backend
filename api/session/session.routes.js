const express = require("express");
const queries = require("./session.queries");
const router = express.Router();

router.get("/", async (req, res) => {
  const sesions = await queries.find();
  res.json(sesions);
});

router.get("/:id/participants", async (req, res, next) => {
  const { id } = req.params;

  try {
    const participants = await queries.getParticipant(parseInt(id, 10) || 1);

    if (participants) {
      return res.json(participants);
    }

    return next();
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newSession = await queries.create(req.body);

    if (newSession) {
      return res.json(newSession);
    }

    return next();
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id/speakers", async (req, res, next) => {
  const { id } = req.params;

  try {
    const participants = await queries.getSpeaker(parseInt(id, 10) || 1);

    if (participants) {
      return res.json(participants);
    }

    return next();
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const session = await queries.get(parseInt(id, 10) || 1);

    if (session) {
      return res.json(session);
    }

    return next();
  } catch (err) {
    console.log(err);
  }
});

router.patch("/:id/join/:userId", async (req, res, next) => {
  const { id, userId } = req.params;

  try {
    const session = await queries.join(parseInt(id, 10), parseInt(userId, 10));

    if (session) {
      return res.json({ message: "success" });
    }

    return next();
  } catch (err) {
    console.log(err);
    next();
  }
});

router.patch("/:id/assignSpeaker", async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await queries.assignSpeaker(
      parseInt(id, 10),
      req.body.speaker_id,
      req.body.topic_name,
      req.body.description,
      req.body.attached_doc_link
    );

    if (result) {
      return res.json({ message: "success" });
    }

    return next();
  } catch (err) {
    console.log(err);
    next();
  }
});

module.exports = router;
