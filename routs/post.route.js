'use strict';

const express = require('express');
const router = express.Router();
const bearerAuth = require('../middlewares/bearerAuth');
const ability = require('../middlewares/listControl');

const { Post, users, commentModel } = require('../models/index');
// console.log(bearerAuth);
// routes
router.get('/post', bearerAuth, ability('read'), getPost);
router.post('/post', bearerAuth, ability('create'), createPost);
router.get('/post/:id', bearerAuth, ability('read'), getOnePost);
router.get('/posts', bearerAuth, ability('read'), getPostComment);
router.delete('/post/:id', bearerAuth, ability('delete'), deletePost);
router.put('/post/:id', bearerAuth, ability('update'), updatePost);

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
