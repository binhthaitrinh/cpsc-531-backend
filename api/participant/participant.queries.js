const db = require("../../db");

module.exports = {
  find() {
    return db("participant").select();
  },
};
