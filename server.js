"use strict";
const express = require("express");
const cors = require("cors");
const app = express();

const postRouter = require("./routs/post.route");
const commentRouter = require("./routs/comment.route");
const errorHandler = require("./error-handlers/500");
const notFoundHandler = require("./error-handlers/404");
const userRouter = require("./routs/user.route");

app.use(cors());
app.use(express.json());
app.use(postRouter);
app.use(commentRouter);
app.use(userRouter);

app.get("/", (req, res) => {
  res.status(200).send("hello eyad");
});

app.use("*", errorHandler);
app.use(notFoundHandler);

function start(port) {
  app.listen(port, () => console.log(`server is listining to ${port}`));
}
module.exports = {
  start,
  app,
};
