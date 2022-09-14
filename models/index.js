"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const post = require("./post.model");
const Comment = require("./comment.model");
const collection = require("../collection/user-comment-routes");

const POSTGRES_URL =
  process.env.DATABASE_URL || "postgresql://localhost:5432/postgres";

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
const postModel = post(sequelize, DataTypes);
const commentModel = Comment(sequelize, DataTypes);

// relations
postModel.hasMany(commentModel, {
  foreignkey: "commentID",
  sourceKey: "id",
}); // sourcekey is the primery key
commentModel.belongsTo(postModel, { foreignkey: "commentID", targetKey: "id" });

const postcollection = new collection(postModel);
const commentCollection = new collection(commentModel);

module.exports = {
  db: sequelize,
  Post: postcollection,
  Comment: commentCollection,
  commentModel: commentModel,
};
