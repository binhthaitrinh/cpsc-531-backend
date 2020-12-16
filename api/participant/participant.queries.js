const { first } = require("../../db");
const db = require("../../db");

module.exports = {
  find() {
    return db("Participant").select();
  },
  async get(id) {
    return db("Participant")
      .join(
        "Contact_Info",
        "Contact_Info.Participant_ID",
        "=",
        "Participant.Participant_ID"
      )
      .where({ "Participant.Participant_id": id })
      .first();
    // .select(
    //   "participant.participant_id",
    //   "participant.first_name",
    //   "participant.last_name",
    //   "participant.date_of_birth",
    //   "participant.gender",
    //   "position.position_title",
    //   "position.start_time",
    //   "position.company",
    //   "contact_info.url"
    // );
  },
  async updatePosition(id, { title, company, time }) {
    return db("Participant")
      .where("Participant_ID", "=", id)
      .update({ Position_Title: title, Company: company, Start_Time: time });
  },

  async updateMe(
    id,
    {
      First_Name,
      Last_Name,
      Date_Of_Birth,
      Gender,
      Position_Title,
      Company,
      Start_Date,
    }
  ) {
    return db("Participant")
      .where("Participant_ID", "=", id)
      .update({
        First_Name,
        Last_Name,
        Date_Of_Birth,
        Gender,
        Position_Title,
        Company,
        Start_Date,
      });
  },

  async insertContact(id, { contactType, url }) {
    return db("Contact_Info").insert({
      Participant_ID: id,
      Contact_Type_ID: contactType,
      url,
    });
  },

  async updateContact(id, contactType, url) {
    return db("Contact_Info")
      .where({ Participant_ID: id, Contact_Type_ID: contactType })
      .update({ URL: url });
  },

  async updateProfile(id, { first_name, last_name, date_of_birth, gender }) {
    return db("Participant").where({ Participant_ID: id }).update({
      First_Name: first_name,
      Last_Name: last_name,
      Date_Of_Birth: date_of_birth,
      Gender: gender,
    });
  },
};
