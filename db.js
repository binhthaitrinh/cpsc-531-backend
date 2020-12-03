require("dotenv").config();
const knex = require("knex");

const connection = knex({
  client: "mysql",
  connection: {
    database: "127.0.0.1",
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
  },
});

module.exports = connection;
