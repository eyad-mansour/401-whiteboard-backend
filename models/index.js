'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const User = require('./user.model');
const post = require('./post.model');
const Comment = require('./comment.model');
const collection = require('../collection/user-comment-routes');

const POSTGRES_URL =
  process.env.DATABASE_URL || 'postgresql://localhost:5432/postgres';

// const users = require("./user.model");

// const sequelizeOption = {};
const sequelizeOption = {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

const sequelize = new Sequelize(POSTGRES_URL, sequelizeOption);
const userModel = User(sequelize, DataTypes);
const postModel = post(sequelize, DataTypes);
const commentModel = Comment(sequelize, DataTypes);

// const userModel = users(sequelize, DataTypes);

sequelize
  .authenticate()
  .then(() => {
    console.log('database connected to postgres');
  })
  .catch((err) => {
    console.log(err);
  });

const db = {};
db.sequelize = sequelize;
db.users = require('./user.model')(sequelize, DataTypes);
// const users = require("../models/user.model");
// console.log(db.users + 'users from index');
// const { database } = require("pg/lib/defaults");  +++#@#$@#@#@$!#%@!$#@$!!@#
// relations
postModel.hasMany(commentModel, { foreignKey: 'commentID', sourceKey: 'id' }); // sourcekey is the primery key
commentModel.belongsTo(postModel, { foreignKey: 'commentID', targetKey: 'id' });
// realtion for the user with the post and comment
userModel.hasMany(postModel, { foreignKey: 'postID', sourceKey: 'id' });
postModel.belongsTo(userModel, { foreignKey: 'postID', targetKey: 'id' });
userModel.hasMany(commentModel, { foreignKey: 'commentID', sourceKey: 'id' });
commentModel.belongsTo(userModel, { foreignKey: 'commentID', targetKey: 'id' });

const userCollection = new collection(userModel);
const postcollection = new collection(postModel);
const commentCollection = new collection(commentModel);

// module.exports = db;
module.exports = {
  db: sequelize,
  Post: postcollection,
  Comment: commentCollection,
  commentModel: commentModel,
  users: db.users,
  // users: db.users,
  // Users: db.users(sequelize, DataTypes),
  userModel,
  userCollection,
};
