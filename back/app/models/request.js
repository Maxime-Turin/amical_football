const client = require('../clients/pg');
const CoreDatamapper = require('./coreDatamappers');

module.exports = class request extends CoreDatamapper {
  static tableName = 'request';

  static async createRequest(userId, announcementId) {
    const preparedQuery = {
      text: `
        SELECT * FROM insert_request($1)
      `,
      values: [{ userId, announcementId }],
    };
    const result = await client.query(preparedQuery);
    return result.rows;
  }

  static async requestReceived(id) {
    const preparedQuery = {
      text: `
        SELECT * FROM read_request_received($1)
      `,
      values: [{ userId: id }],
    };
    const result = await client.query(preparedQuery);
    return result.rows;
  }

  static async requestSended(id) {
    const preparedQuery = {
      text: `
        SELECT * FROM read_request_sended($1)
      `,
      values: [{ userId: id }],
    };
    const result = await client.query(preparedQuery);
    return result.rows;
  }

  static async getAnnouncementId(requestId) {
    const preparedQuery = {
      text: `
        SELECT "announcementId" FROM read_request($1)
      `,
      values: [{ id: requestId }],
    };
    const result = await client.query(preparedQuery);
    return result.rows;
  }

  static async validateRequest(data) {
    const preparedQuery = {
      text: `
        SELECT * FROM update_request($1)
      `,
      values: [data],
    };
    const result = await client.query(preparedQuery);
    return result.rows;
  }

  static async rejectRequest(announcementId) {
    const preparedQuery = {
      text: `
        SELECT * FROM set_requests_status_rejected($1)
      `,
      values: [{ announcementId: announcementId[0] }],
    };
    const result = await client.query(preparedQuery);
    return result.rows;
  }

  static async deleteRequest(requestId) {
    const preparedQuery = {
      text: `
        SELECT * FROM delete_request($1)
      `,
      values: [{ id: requestId }],
    };
    const result = await client.query(preparedQuery);

    return result.rows;
  }
};
