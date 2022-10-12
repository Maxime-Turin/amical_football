const CoreDatamapper = require('./coreDatamappers');
const client = require('../clients/pg');

module.exports = class user extends CoreDatamapper {
  static tableName = 'user';

  static async findByEmail(mail) {
    const sqlQuery = `SELECT * FROM "${this.tableName}" WHERE mail = $1`;
    const result = await client.query(sqlQuery, [mail]);
    return result.rows[0];
  }

  static async findByName(name) {
    const sqlQuery = `SELECT * FROM "${this.tableName}" WHERE "teamName" = $1`;
    const result = await client.query(sqlQuery, [name]);
    return result.rows[0];
  }

  static async createOneUser(data) {
    const sqlQuery = 'SELECT * FROM insert_user ($1)';
    const result = await client.query(sqlQuery, [data]);
    return result.rows;
  }

  static async UpdateProfile(data) {
    const sqlQuery = 'SELECT * FROM update_user($1)';
    const result = await client.query(sqlQuery, [data]);
    return result.rows;
  }

  static async deleteOneUser(id) {
    const sqlQuery = 'SELECT * FROM delete_user ($1)';
    const result = await client.query(sqlQuery, [id]);
    return result.rows;
  }
};
