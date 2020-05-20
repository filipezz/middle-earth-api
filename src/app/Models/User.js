import bcrypt from 'bcryptjs';

const db = require('../../database');

class User {
  create(name, email, password_hash) {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users (name, email, password_hash) values ('${name}', '${email}', '${password_hash}')`,
        (error, results) => {
          if (error) throw error;
          return resolve(results);
        }
      );
    });
  }

  getUsers() {
    const users = db.query(
      `select u.id, avatar_id, f.url as avatar_url, u.name, u.email, u.created_at, u.updated_at from users u join files f on u.avatar_id=f.id`
    );

    return users;
  }

  getUserById(id) {
    const user = db.query(`select * from users where id=${id}`);

    return user;
  }

  getUserByEmail(email) {
    return new Promise((resolve, reject) => {
      db.query(
        `select * from users where email='${email}'`,
        (error, results) => {
          if (error) throw error;
          return resolve(results);
        }
      );
    });
  }

  hashPassword(password) {
    const password_hash = bcrypt.hash(password, 8);
    return password_hash;
  }

  checkPassword(password, password_hash) {
    return bcrypt.compare(password, password_hash);
  }

  update(id, json) {
    const { name, email, password, avatar_id } = json;

    if (name) {
      db.query(`update users set name='${name}' where id=${id}`);
    }

    if (email) {
      db.query(`update users set email='${email}' where id=${id}`);
    }

    if (password) {
      const password_hash = this.hashPassword(password);

      db.query(
        `update users set password_hash='${password_hash}' where id=${id}`
      );
    }

    if (avatar_id) {
      db.query(`update users set avatar_id=${avatar_id} where id=${id}`);
    }

    const user = db.query(`select * from users where id=${id}`);

    return user;
  }
}

export default new User();
