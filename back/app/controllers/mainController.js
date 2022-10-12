module.exports = {
  async profilePage(req, res) {
    try {
      // retrieve the user session with req.session.user
      await res.json(req.session.user);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  },

};
