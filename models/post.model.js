'use strict';

const Post = (sequelize, DataTypes) =>
  sequelize.define('Post', {
    postName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
module.exports = Post;
