"use strict";

const Post = (sequelize, DataTypes) =>
  sequelize.define("Post", {
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
