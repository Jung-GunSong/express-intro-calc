"use strict";

const express = require("express");
const { NotFoundError, BadRequestError } = require("./expressError");
const shoppingRoutes = require("./shoppingRoutes");

const app = express();

app.use(express.json())
app.use(express.urlencoded()); //not technically needed


app.use("/items", shoppingRoutes);


app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  const statusMessage = err.statusMessage;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});


module.exports = app;