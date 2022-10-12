const client = require('../clients/pg');
const CoreDatamapper = require('./coreDatamappers');

module.exports = class announcement extends CoreDatamapper {
  static tableName = 'announcement';

  static async findAnnouncementsByUserId(userId) {
    const preparedQuery = {
      text: `
        SELECT * FROM read_announcement($1)
      `,
      values: [{ userId }],
    };
    const result = await client.query(preparedQuery);

    return result.rows;
  }

  static async postAnnouncementByUserId(data) {
    const preparedQuery = {
      text: `
        SELECT * FROM insert_announcement($1)
      `,
      values: [data],
    };
    const result = await client.query(preparedQuery);

    return result.rows;
  }

  static async deleteAnnouncement(announcementId) {
    const preparedQuery = {
      text: `
        SELECT * FROM delete_announcement($1)
      `,
      values: [{ id: announcementId }],
    };
    const result = await client.query(preparedQuery);

    return result.rows;
  }

  static async searchAnnouncements(data) {
    const preparedQuery = {
      text: `
        SELECT * FROM read_filtered_announcements($1)
      `,
      values: [data],
    };
    const result = await client.query(preparedQuery);
    return result.rows;
  }

  static async updateAnnouncement(announcementId) {
    const preparedQuery = {
      text: `
        SELECT * FROM update_announcement($1)
      `,

      values: [{ id: announcementId[0], announcementStatus: 'completed' }],
    };
    const result = await client.query(preparedQuery);
    return result.rows;
  }
};
