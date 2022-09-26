'use strict';
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const User = require('../models').users;

const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const data = {
      userName,
      email,
      password: await bcrypt.hash(password, 10),
    };

    const user = await User.create(data);

    if (user) {
      res.status(201).json(user);
    }
  } catch (error) {
    console.log(` this error is from  user controller ${error}`);
  }
};

const login = async (req, res) => {
  // console.log(req.headers.authoraization);
  // if (!req.headers.authoraization) return res.status(401).send("Bad Request");
  // console.log(req.headers);
  const basicHeader = req.headers.authorization.split(' ');
  const encodedHeader = basicHeader.pop();
  console.log(encodedHeader);
  // console.log(encodedValue)
  const decodedValue = base64.decode(encodedHeader);
  console.log(decodedValue);
  const [email, password] = decodedValue.split(':');

  const user = await User.findOne({
    where: {
      email: email,
    },
  });
  if (user) {
    const isSame = await bcrypt.compare(password, user.password);
    if (isSame) {
      res.status(200).json(user);
    } else {
      return res.status(401).send('you are not authorized');
    }
  } else {
    return res.status(401).send('you are not authorized');
  }
};

const allUser = async (req, res) => {
  const users = await User.findAll();
  res.json(users);
};

module.exports = {
  signup,
  allUser,
  login,
};
