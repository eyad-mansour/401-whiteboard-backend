"use strict";
const express = require("express");
const cors = require("cors");
const app = express();

const postRouter = require("./routs/post.route");
const errorHandler = require("./error-handlers/500");
const notFoundHandler = require("./error-handlers/404");

app.use(cors());
app.use(express.json());
app.use(postRouter);

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
