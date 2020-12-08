const { select } = require("../../db");
const db = require("../../db");

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  console.log(username);

  const user = await db("participant").where({ login_id: username }).select();
  console.log(user);
};
