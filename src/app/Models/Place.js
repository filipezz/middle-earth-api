const db = require('../../database');

class Place {
  create(user_id, name, image_id) {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO places (user_id, name, image_id, likes_count) values ('${user_id}', '${name}', '${image_id}', 0)`,
        (error, results) => {
          if (error) throw error;
          return resolve(results);
        }
      );
    });
  }

  getPlaces(user_id) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT places.id, places.name, images.url as image_url, places.likes_count from places INNER JOIN images ON places.image_id=images.id where user_id='${user_id}'`,
        (error, results) => {
          if (error) throw error;
          return resolve(results);
        }
      );
    });
  }

  getPlaceById(id) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT places.id, places.name, places.likes_count,
          images.id as image_id, images.url,
          users.id as user_id, users.name as user_name
          from places INNER JOIN users ON places.user_id= users.id
          INNER JOIN images ON places.image_id = images.id where places.id=${id}`,
        (error, results) => {
          if (error) throw error;
          return resolve(results);
        }
      );
    });
  }

  updatePlace(id, json) {
    const { name, image_id } = json;

    return new Promise((resolve, reject) => {
      if (name) {
        db.query(
          `UPDATE places SET name='${name}' where id=${id}`,
          (error, results) => {
            if (error) throw error;
            return resolve(results);
          }
        );
      }

      if (image_id) {
        db.query(
          `UPDATE places SET image_id='${image_id}' where id=${id}`,
          (error, results) => {
            if (error) throw error;
            return resolve(results);
          }
        );
      }
    });
  }

  deletePlace(place_id) {
    return new Promise((resolve, reject) => {
      db.query(
        `DELETE from places WHERE id='${place_id}'`,
        (error, results) => {
          if (error) throw error;
          return resolve(results);
        }
      );
    });
  }

  addLikes(place_id) {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE places SET likes_count=likes_count+1 where id=${place_id}`,
        (error, results) => {
          if (error) throw error;
          return resolve(results);
        }
      );
    });
  }
}

export default new Place();
