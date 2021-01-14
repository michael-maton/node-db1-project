const db = require("../../data/dbConfig.js");

module.exports = {
  get,
  getById,
  create,
  update,
  remove,
};

function get() {
  return db().from("accounts");
}

function getById(id) {
  return db("accounts").where({ id }).first();
}

function create(account) {
  return db("accounts")
    .insert(account)
    .then(([id]) => {
      return getById(id);
    });
}

function update(id, account) {
  return db("accounts")
    .update(account)
    .where("id", id)
    .then(() => {
      return getById(id);
    });
}

async function remove(id) {
    const accountToDelete = await getById(id)
    await db('accounts').delete().where('id', id)
    return Promise.resolve(accountToDelete)
}
