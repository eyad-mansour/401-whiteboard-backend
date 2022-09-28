'use strict';

const { users } = require('../models');

module.exports = async (req, res, next) => {
  console.log(`from inside the middileware`);
  //   console.log(req.headers.authoraization);
  if (!req.headers.authoraization) {
    return next('you are not authorized ????????????????????????????? ');
  }
  const token = req.headers.authoraization.split(' ').pop();

  try {
    const validUser = users.authenticateToken(token);

    const userInfo = await users.findOne({
      where: { userName: validUser.userName },
    });
    if (userInfo) {
      req.user = userInfo;
      req.token = userInfo.token;

      next();
    } else {
      next('you are not authinticate ???????????????????');
    }
    console.log(userInfo);
  } catch (error) {
    next(error);
  }
};
