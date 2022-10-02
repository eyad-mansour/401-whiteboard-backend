'use strict';

const User = require('../models').users;
console.log('this is the users from user auther: ' + User);
const saveUser = async (req, res, next) => {
  try {
    // Search for the username in the Database
    const username = await User.findOne({
      where: {
        userName: req.body.userName,
      },
    });

    if (username) {
      return res.status(409).send('User name already taken');
    }

    // Serch for the email in the database
    const email = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (email) {
      return res.status(409).send('Email already taken');
    }

    next();
  } catch (error) {
    console.log(`this error is from auth ${error}`);
  }
};

module.exports = { saveUser };
