const bcrypt = require('bcrypt');
// const sendmail = require('sendmail')();

const saltRounds = 10;
const models = require('../models');
const ApiError = require('../error/apiError');

module.exports = {
  // Get the user by his id
  async getUserById(req, res) {
    if (req.params.id === 'all') {
      const users = await models.user.findAll();
      return res.json({ users, doug: true });
    }
    const { id } = req.params;
    const user = await models.user.findOne(id);
    if (!user) {
      throw new ApiError('Utilisateur introuvable', { statusCode: 500 });
    }
    delete user.password;
    return res.json({ user });
  },
  // Update the user
  async userUpdate(req, res) {
    const userId = req.params.id;
    const post = { id: userId, ...req.body };
    if (post.password) {
      const hashedPassword = await bcrypt.hash(post.password, saltRounds);
      post.password = hashedPassword;
    }
    const user = await models.user.UpdateProfile(JSON.stringify(post));
    delete user[0].password;
    res.json({ user });
  },
  // Delete the user
  async deleteUser(req, res) {
    const { id } = req.body;
    const deletedUser = await models.user.deleteOneUser({ userId: id });
    res.json({ deletedUser, doug: true });
  },
  // Contact a team with a mail
  async contactUser(req, res) {
    const {
      id,
    } = req.body;
    const userId = req.params.id;
    const contactedUser = await models.user.findOne({ userId: id });
    if (!contactedUser) {
      throw new ApiError('L\'utilisateur à contacter n\'existe pas');
    }
    const senderUser = await models.user.findOne({ userId });
    if (!senderUser) {
      throw new ApiError('L\'utilisateur n\'existe pas');
    }
    // sendmail({
    //   from: process.env.EMAIL_CLIENT,
    //   to: contactedUser.mail,
    //   subject: `${teamName} est intéressé par une de vos annonces.`,
    //   html: `${text}`,
    // }, (err, reply) => {
    //   console.log(err && err.stack);
    //   console.dir(reply);
    // });

    res.json({ contactedUser });
  },
};
