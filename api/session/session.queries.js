const { join } = require("../../db");
const db = require("../../db");
const { get } = require("./session.routes");

module.exports = {
  find() {
    return db("Session")
      .join(
        "Participant",
        "Session.Session_Host_ID",
        "=",
        "Participant.Participant_ID"
      )
      .select(
        "Session.Session_ID",
        "Session.Date",
        "Session.Start_Time",
        "Session.End_Time",
        "Session.Theme",

        db.raw(
          'CONCAT(Participant.First_Name, " ", Participant.Last_Name) AS Session_host'
        ),
        "Participant.Participant_ID"
      );
  },
  async get(id) {
    return db("Session")
      .where({ Session_ID: id })
      .join(
        "Participant",
        "Session.Session_Host_ID",
        "=",
        "Participant.Participant_ID"
      )
      .first();
  },

  async getParticipant(id) {
    return db("Session_Participant")
      .join(
        "Participant",
        "Participant.Participant_ID",
        "=",
        "Session_Participant.Participant_ID"
      )
      .join("Role", "Session_Participant.Role_ID", "=", "Role.Role_ID")
      .select(
        "Participant.Participant_ID",
        "Participant.First_Name",
        "Participant.Last_Name",
        "Role.Role_Type"
      )
      .where({ Session_ID: id, "Role.Role_ID": 3 });
  },

  async getSpeaker(id) {
    return db("Participant")
      .join(
        "Session_Participant",
        "Session_Participant.Participant_ID",
        "=",
        "Participant.Participant_ID"
      )

      .join("Topic", "Topic.Speaker_ID", "=", "Participant.Participant_ID")
      .select(
        "Participant.Participant_ID",
        "Participant.First_Name",
        "Participant.Last_Name",
        "Participant.Position_title",
        "Participant.Company",
        "Participant.Start_Time",
        "Topic.Topic_Name"
      )
      .where({
        "Session_Participant.Role_ID": 2,
        "Session_Participant.Session_ID": id,
      });
  },

  async join(id, userId) {
    return db("Session_Participant").insert({
      Participant_ID: userId,
      Session_ID: id,
      Role_ID: 3,
    });
  },

  async create({
    Date,
    Start_Time,
    End_Time,
    Session_Host_ID,
    Theme,
    Meeting_Link,
    Website_Link,
    Recording_Link,
    Table_Of_Content,
  }) {
    return db("Session").insert({
      Date,
      Start_Time,
      End_Time,
      Session_Host_ID,
      Theme,
      Meeting_Link,
      Website_Link,
      Recording_Link,
      Table_Of_Content,
    });
  },

  async assignSpeaker(
    id,
    speakerId,
    topic_name,
    description,
    attached_doc_link
  ) {
    await db("Session_Participant").insert({
      Participant_ID: speakerId,
      Session_ID: id,
      Role_ID: 2,
    });

    return await db("topic").insert({
      Speaker_ID: speakerId,
      Session_ID: id,
      Topic_Name: topic_name,
      Description: description,
      Attached_Doc_Link: attached_doc_link,
    });
  },
};
