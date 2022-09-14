"use strict";

const express = require("express");
const router = express.Router();

const { Comment } = require("../models/index");
// const { Post } = require("../models/index");

// routes
router.get("/comment", getComment);
router.post("/comment", createComment);
router.get("/comment/:id", getOneComment);
router.delete("/comment/:id", deleteComment);
router.put("/comment/:id", updateComment);

async function getComment(req, res) {
  const comment = await Comment.read();
  res.status(200).json({
    comment,
  });
}

async function createComment(req, res) {
  // console.log(req.body);
  const newComment = req.body;
  const comment = await Comment.create(newComment);
  res.status(201).json(comment);
}

async function getOneComment(req, res) {
  const id = req.params.id;
  const comment = await Comment.read(id);
  res.status(200).json(comment);
}

async function deleteComment(req, res) {
  const id = req.params.id;
  const deletedComment = await Comment.destroy({
    where: { id: id },
  });
  res.status(204).json(deletedComment);
}

async function updateComment(req, res) {
  const id = req.params.id;
  const obj = req.body;
  // const comment = await Comment.read(id);

  const updatedComment = await Comment.update(id, obj);
  res.status(200).json(updatedComment);
}

module.exports = router;
