const models = require('../models');

module.exports = {
  // Get the data of the dev Team
  async getDevTeam(req, res) {
    const devTeam = await models.devTeam.findAll();
    res.json({ devTeam });
  },
};
