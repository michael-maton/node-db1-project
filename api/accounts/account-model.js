const db = require("../../data/dbConfig.js");

module.exports = {
  get,
  getById,
  create,
};

function get() {
  return db().from("accounts");
}

function getById(id) {
  return db("accounts").where({ id }).first();
}

function create(account) {
    return db("accounts").insert(account)
        .then(([id]) => {
            return getById(id)
        })
}