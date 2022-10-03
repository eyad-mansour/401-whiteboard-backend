'use strict';

const express = require('express');
const router = express.Router();
const bearerAuth = require('../middlewares/bearerAuth');

const { Post, users, commentModel } = require('../models/index');

// routes
router.get('/post', getPost);
router.post('/post', createPost);
router.get('/post/:id', getOnePost);
router.get('/posts', getPostComment);
router.delete('/post/:id', deletePost);
router.put('/post/:id', updatePost);

async function getPost(req, res) {
  let posts = await Post.read();
  res.status(200).json({
    posts,
  });
}

async function createPost(req, res) {
  console.log(req.body, '====================================');

  let newPost = req.body;
  console.log(newPost);
  let post = await Post.create(newPost);

  res.status(201).json(post);
}

async function getOnePost(req, res) {
  let id = req.params.id;
  let post = await Post.read(id);
  res.status(200).json(post);
}

async function deletePost(req, res) {
  let id = req.params.id;
  let deletedPost = await Post.delete(id);
  res.status(204).json(deletedPost);
}

async function updatePost(req, res) {
  let id = req.params.id;
  let obj = req.body;
  // let post = await Post.read(id);
  let updatedPost = await Post.update(id, obj);
  res.status(200).json(updatedPost);
}

async function getPostComment(req, res) {
  const postComment = await Post.readWithComment(commentModel);
  res.status(200).json(postComment);
}

module.exports = router;
