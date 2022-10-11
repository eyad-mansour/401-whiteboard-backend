'use strict';

module.exports = (capabilities) => {
  return function (req, res, next) {
    console.log(req.user, '413432154352345343453453452345234');
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
