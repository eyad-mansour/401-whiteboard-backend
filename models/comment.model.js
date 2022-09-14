"use strict";

const Comment = (sequelize, DataTypes) =>
  sequelize.define("Comment", {
    commentName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    commentAge: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    commentID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
module.exports = Comment;
