'use strict';

const { users } = require('../models/index');

module.exports = async (req, res, next) => {
  // console.log(req.headers.authorization, '');
  if (!req.headers.authorization) {
    return next('you are not authorized ????????????????????????????? ');
  }
  const token = req.headers.authorization.split(' ').pop();
  // console.log(token, 'this is the token !@#@#!$%');
  try {
    const validUser = await users.authenticateToken(token);
    console.log(validUser);
    const userInfo = await users.findOne({
      where: {
        userName: validUser.userName,
      },
    });
    console.log(userInfo, 'this is the user ########3');
    if (userInfo) {
      req.user = userInfo;
      req.token = userInfo.token;
      console.log(req.token);
      next();
    } else {
      next('you are not authinticate ???????????????????');
    }
    console.log(userInfo);
  } catch (error) {
    next(error);
  }
};
