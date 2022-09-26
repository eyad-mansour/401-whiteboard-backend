'use strict';
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      isEmail: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.VIRTUAL,
      get: function () {
        return jwt.sign(
          {
            userName: this.userName,
          },
          process.env.JWT_SECRET
        );
      },
      set(tokenObj) {
        const token = jwt.sign(tokenObj, process.env.JWT_SECRET);
        return token;
      },
    },
  });
  User.authenticateToken = (token) => {
    // console.log(token);
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return err;
      } else {
        return decoded;
      }
    });
  };
  return User;
};
