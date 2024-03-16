//models
const db = require('../util/database');

module.exports = class Image {
  constructor(image_id, facemash_id, image_url, points) {
    this.image_id = image_id;
    this.facemash_id = facemash_id;
    this.image_url = image_url;
    this.points = points;
  }

  static fetchAll() {
    return db.execute('SELECT image_id, facemash_id,image_url, points, account.name as name FROM images INNER JOIN account on images.facemash_id = account.aid');
  }

  static updatePoints(imageId, newPoints) {
    return db.execute('UPDATE images SET points = ? WHERE image_id = ?', [newPoints, imageId]);
  }

  static fetchTopTen() {
    return db.execute('SELECT *, account.name FROM images INNER JOIN account ON account.aid = images.facemash_id ORDER BY points DESC LIMIT 10');
  }
  
  static fetchTopTenUser() {
    return db.execute('SELECT * FROM account');
  }

  static fetchTopTenUser7day(){
    return db.execute('SELECT * FROM statistics WHERE date BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE();');
  }
};


