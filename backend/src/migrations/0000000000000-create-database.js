const mysqlm = require('mysqlm');

const { DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD } = process.env;

const config = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD
}

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`CREATE DATABASE ${DB_DATABASE}`);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`DROP DATABASE ${DB_DATABASE}`);
}

module.exports = { up, down }