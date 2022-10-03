'use strict';

const Comment = (sequelize, DataTypes) =>
  sequelize.define('Comment', {
    commentName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
module.exports = Comment;
