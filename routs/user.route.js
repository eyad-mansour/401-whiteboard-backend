'use strict';

const { signup, allUser, login } = require('../controllers/userControllers');

const bearerAuth = require('../middlewares/bearerAuth');

const router = require('express').Router();
const userAuth = require('../middlewares/userAuth');

router.post('/login', login);
// router.post("/login", login);
router.post('/signup', userAuth.saveUser, signup);
router.get('/users', bearerAuth, allUser);

module.exports = router;
