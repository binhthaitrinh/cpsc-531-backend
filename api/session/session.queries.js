const { join } = require("../../db");
const db = require("../../db");
const { get } = require("./session.routes");

module.exports = {
  find() {
    return db("session")
      .join(
        "participant",
        "session.session_host_id",
        "=",
        "participant.participant_id"
      )
      .select(
        "session.session_id",
        "session.date",
        "session.start_time",
        "session.end_time",
        "session.theme",

        db.raw(
          'CONCAT(participant.first_name, " ", participant.last_name) AS session_host'
        ),
        "participant.participant_id"
      );
  },
  async get(id) {
    return db("session")
      .where({ session_id: id })
      .join(
        "participant",
        "session.session_host_id",
        "=",
        "participant.participant_id"
      )
      .first();
  },

  async getParticipant(id) {
    return db("session_participant")
      .join(
        "participant",
        "participant.participant_id",
        "=",
        "session_participant.participant_id"
      )
      .join("role", "session_participant.role_id", "=", "role.role_id")
      .select(
        "participant.participant_id",
        "participant.first_name",
        "participant.last_name",
        "role.role_type"
      )
      .where({ session_id: id, "role.role_id": 3 });
  },

  async getSpeaker(id) {
    return db("participant")
      .join(
        "session_participant",
        "session_participant.participant_id",
        "=",
        "participant.participant_id"
      )
      .join(
        "position",
        "position.participant_id",
        "=",
        "participant.participant_id"
      )
      .join("topic", "topic.speaker_id", "=", "participant.participant_id")
      .select(
        "participant.participant_id",
        "participant.first_name",
        "participant.last_name",
        "position.position_title",
        "position.company",
        "position.start_time",
        "topic.topic_name"
      )
      .where({
        "session_participant.role_id": 2,
        "session_participant.session_id": id,
      });
  },

  async join(id, userId) {
    return db("session_participant").insert({
      participant_id: userId,
      session_id: id,
      role_id: 3,
    });
  },

  async create({
    date,
    start_time,
    end_time,
    session_host_id,
    theme,
    meeting_link,
    website_link,
    recording_link,
    table_of_content,
  }) {
    return db("session").insert({
      date,
      start_time,
      end_time,
      session_host_id,
      theme,
      meeting_link,
      website_link,
      recording_link,
      table_of_content,
    });
  },

  async assignSpeaker(
    id,
    speakerId,
    topic_name,
    description,
    attached_doc_link
  ) {
    await db("session_participant").insert({
      participant_id: speakerId,
      session_id: id,
      role_id: 2,
    });

    return await db("topic").insert({
      speaker_id: speakerId,
      session_id: id,
      topic_name,
      description,
      attached_doc_link,
    });
  },
};
