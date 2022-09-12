"use strict";

const Post = (sequelize, DataTypes) =>
  sequelize.define("post", {
    postName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postStatus: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
module.exports = Post;
