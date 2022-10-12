const models = require('../models');
const researchData = require('../helpers/researchData');

module.exports = {

  // Get the announcements of an user with his id
  async getUserAnnouncements(req, res) {
    const { id } = req.params;
    const announcements = await models.announcement.findAnnouncementsByUserId(id);
    res.json({ announcements, doug: true });
  },

  // Post the announcement of an user
  async postAnnouncement(req, res) {
    const userId = req.params.id;
    const post = { userId, ...req.body };
    const announcement = await models.announcement.postAnnouncementByUserId(JSON.stringify(post));
    res.json({ announcement, doug: true });
  },
  // Delete the announcement of an user with his id
  async deleteAnnouncement(req, res) {
    const { id } = req.body;
    const deletedAnnouncement = await models.announcement.deleteAnnouncement(id);
    res.json({ deletedAnnouncement, doug: true });
  },
  // Research announcements
  async searchAnnouncements(req, res) {
    const { research } = req.params;
    const data = researchData.dataFormat(research);
    const researchResult = await models.announcement.searchAnnouncements(data);
    res.json({ researchResult, doug: true });
  },

};
