const models = require('../models');

module.exports = {
  // Create a request
  async createRequest(req, res) {
    const {
      userId,
      announcementId,
    } = req.body;
    const requestCreated = await models.request.createRequest(userId, announcementId);
    res.json({ requestCreated, doug: true });
  },

  // Get request received
  async getRequestReceived(req, res) {
    const { id } = req.params;
    const requestsReceived = await models.request.requestReceived(id);
    res.json({ requestsReceived, doug: true });
  },
  // Get request sended
  async getRequestSended(req, res) {
    const { id } = req.params;
    const requestsSended = await models.request.requestSended(id);
    res.json({ requestsSended, doug: true });
  },
  // update request's status to accepted and rejected all others requests linked to the announcement
  async validateRequest(req, res) {
    const { requestId, requestStatus } = req.body;
    const data = {
      id: requestId,
      requestStatus,
    };
    // Get announcementId
    const result = await models.request.getAnnouncementId(requestId);
    // result need to be formated
    const announcementId = Object.values(result[0]);
    // validate the target request on status: accepted
    const updatedRequest = await models.request.validateRequest(JSON.stringify(data));
    // Rejected all others requests on the announcement by passing their status in rejected
    const rejectedRequest = await models.request.rejectRequest(announcementId);
    // Change announcement Status on completed
    const announcementCompleted = await models.announcement.updateAnnouncement(announcementId);
    res.json({
      updatedRequest, rejectedRequest, announcementCompleted, doug: true,
    });
  },
  // delete request
  async deleteRequest(req, res) {
    const { id } = req.body;
    const deletedRequest = await models.request.deleteRequest(id);
    res.json({ deletedRequest, doug: true });
  },
};
