const mysqlm = require('mysqlm');

const { DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD } = process.env;

const config = {
  host: DB_HOST,
  database: DB_DATABASE,
  user: DB_USER,
  password: DB_PASSWORD
}

async function up () {
  const {query} = mysqlm.connect(config);

  await query(`
    CREATE TABLE user(
        id INT PRIMARY KEY AUTO_INCREMENT,

        name VARCHAR(30) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
}

async function down () {
  const {query} = mysqlm.connect(config);

  await query(`DROP TABLE user`);
}

module.exports = { up, down }