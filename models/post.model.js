'use strict';

const Post = (sequelize, DataTypes) =>
  sequelize.define('Post', {
    postName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // postID: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
  });
module.exports = Post;
