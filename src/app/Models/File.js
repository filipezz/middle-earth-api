const db = require('../../database');

class File {
  create(name, path) {
    return new Promise((resolve, reject) => {
      db.query(
        `insert into images (name, path, url) values ('${name}', '${path}', 'http://localhost:3333/files/${path}')`,
        (error, results) => {
          if (error) throw error;
          db.query(
            `select id, name, path, url from images where id=${results.insertId}`,
            (error, results) => {
              if (error) throw error;

              return resolve(results);
            }
          );
        }
      );
    });
  }

  getFileById(id) {
    return new Promise((resolve, reject) => {
      db.query(
        `select id, name, path from images where id=${id}`,
        (error, results) => {
          if (error) throw error;
          return resolve(results);
        }
      );
    });
  }
}

export default new File();
