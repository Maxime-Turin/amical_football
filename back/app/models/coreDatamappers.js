const client = require('../clients/pg');

module.exports = class CoreDatamapper {
  static async findAll() {
    const sqlQuery = `SELECT * FROM "${this.tableName}"`;
    const result = await client.query(sqlQuery);
    return result.rows;
  }

  static async findOne(id) {
    const sqlQuery = `SELECT * FROM "${this.tableName}" WHERE id = $1`;
    const result = await client.query(sqlQuery, [id]);
    return result.rows[0];
  }
};
