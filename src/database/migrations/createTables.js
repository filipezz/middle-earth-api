const connection = require('../migrations');

async function createTables() {
  await connection.query(`CREATE SCHEMA if not exists middle_bnb`);

  await connection.query(`CREATE TABLE middle_bnb.users (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(50) NOT NULL,
    email varchar(20) NOT NULL UNIQUE,
    password_hash varchar(255) NOT NULL,
    PRIMARY KEY(id)
    )`);
  await connection.query(`CREATE TABLE middle_bnb.images (
      id INT NOT NULL AUTO_INCREMENT,
      name varchar(50) NOT NULL,
      path varchar(50) NOT NULL,
      url varchar(255) UNIQUE NOT NULL,
      PRIMARY KEY(id)
      )`);

  await connection.query(`CREATE TABLE middle_bnb.places (
      id INT NOT NULL AUTO_INCREMENT,
      user_id INT(4) NOT NULL,
      name varchar(50) NOT NULL,
      image_id INT(4)  UNIQUE,
      likes_count INT(4),
      PRIMARY KEY(id),
      FOREIGN KEY (image_id) REFERENCES images(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )ENGINE=INNODB`);

  await connection.end();
}

createTables();
