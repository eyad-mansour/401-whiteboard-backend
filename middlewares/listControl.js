'use strict';

module.exports = (capabilities) => {
  return function (req, res, next) {
    console.log(req.user, '');
    if (!req.user.capabilities.includes(capabilities)) {
      if (req.user.id === parseInt(req.params.userID)) {
        next();
      } else {
        res.status(403).send('No ability');
      }
    } else {
      next();
    }
  };
};
