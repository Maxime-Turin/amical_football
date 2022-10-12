const bcrypt = require('bcrypt');
const validator = require('email-validator');
const sendmail = require('sendmail')();

const saltRounds = 10;
const models = require('../models');
const authenticateJWT = require('../helpers/jwt');
const ApiError = require('../error/apiError');

module.exports = {

  async sign_in(req, res) {
    const {
      teamName,
      picture,
      description,
      field,
      level,
      coachName,
      mail,
      phone,
      postalCode,
      city,
      password,
      passwordConfirm,
    } = req.body;
    // check if all the field are completed
    if (
      !teamName
            || !mail
            || !password
            || !passwordConfirm
    ) {
      throw new ApiError('Champs invalides ou incomplets');
    }

    // check the email format

    if (!validator.validate(mail)) {
      throw new ApiError('Email invalide');
    }

    // Compare the password & passwordConfirm

    if (password !== passwordConfirm) {
      throw new ApiError('Le mot de passe confirmée doit être indentique que le mot de passe.');
    }

    // Check if the email exists in the DB

    const userMail = await models.user.findByEmail(mail);
    if (userMail) {
      throw new ApiError('Cet email est déjà utilisé', { statusCode: 400 });
    }

    // Check if the user name exists in the DB
    const userName = await models.user.findByName(teamName);
    if (userName) {
      throw new ApiError('Ce nom est déjà utilisé', { statusCode: 400 });
    }

    // Hash of the password

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const post = {
      teamName,
      picture,
      description,
      field,
      level,
      coachName,
      mail,
      phone,
      postalCode,
      city,
      password: hashedPassword,
    };
    // Creation of the user

    const newUser = await models.user.createOneUser(JSON.stringify(post));
    const userData = newUser[0];
    delete userData.password;
    // Sending a confirmation email to the new user.
    // sendmail({
    //   from: process.env.EMAIL_CLIENT,
    //   to: mail,
    //   subject: 'Confirmation d\'inscription',
    //   html: 'Merci de vous êtes inscrit sur l\'application Amical Football.',
    // }, (err, reply) => {
    //   console.log(err && err.stack);
    //   console.dir(reply);
    // });
    res.json({ userData });
  },

  async login(req, res) {
    const { mail, password } = req.body;

    // check if all the field are completed

    if (!mail || !password) {
      throw new ApiError('Champs invalides ou incomplets.');
    }

    // Check if the user exists using his email

    const user = await models.user.findByEmail(mail);

    if (!user) {
      throw new ApiError('Cet utilisateur n\'existe pas. ', { statusCode: 500 });
    }

    // Compare the password gived by the user and the one on the DB

    const isGood = await bcrypt.compare(password, user.password);
    if (!isGood) {
      throw new ApiError('Mot de passe incorrect', { statusCode: 500 });
    }
    // Create a new session user
    req.session.user = user;

    // Create a jsonwebtoken
    const token = authenticateJWT.generateAccessToken({ userId: user.id });
    delete user.password;
    // return the token with the user data
    return (res.json({ token, user }));
  },
  // eslint-disable-next-line no-unused-vars
  async logout(req, res) {
    // req.session.user = false;
    req.session.destroy();
  },
};
