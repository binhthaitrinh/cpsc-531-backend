const db = require("../../db");

module.exports = {
  find() {
    return db("participant").select();
  },
  async get(id) {
    return db("participant")
      .join(
        "position",
        "position.participant_id",
        "=",
        "participant.participant_id"
      )
      .join(
        "contact_info",
        "contact_info.participant_id",
        "=",
        "participant.participant_id"
      )
      .where({ "participant.participant_id": id })
      .first()
      .select(
        "participant.participant_id",
        "participant.first_name",
        "participant.last_name",
        "participant.date_of_birth",
        "participant.gender",
        "position.position_title",
        "position.start_time",
        "position.company",
        "contact_info.url"
      );
  },
  async updatePosition(id, { title, company, time }) {
    return db("position")
      .where("participant_id", "=", id)
      .update({ position_title: title, company, start_time: time });
  },

  async insertContact(id, { contactType, url }) {
    return db("contact_info").insert({
      participant_id: id,
      contact_type_id: contactType,
      url,
    });
  },

  async updateContact(id, contactType, url) {
    return db("contact_info")
      .where({ participant_id: id, contact_type_id: contactType })
      .update({ url });
  },

  async updateProfile(id, { first_name, last_name, date_of_birth, gender }) {
    return db("participant")
      .where({ participant_id: id })
      .update({ first_name, last_name, date_of_birth, gender });
  },
};
