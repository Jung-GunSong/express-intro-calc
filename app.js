/** Simple demo Express app. */
"use strict";

const express = require("express");
const app = express();

const {findMean, findMode, findMedian} = require("./stats")
const {convertStrNums} = require("./utils")

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";


/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function (req, res){
  const numsArray = convertStrNums(req.query.nums);
  const result = findMean(numsArray);
  return res.json({
    response: {
      operation: "mean",
      value: result
    }
  })
})

/** Finds median of nums in qs: returns {operation: "median", result } */
app.get("/median", function (req, res){
  const numsArray = convertStrNums(req.query.nums);
  const result = findMedian(numsArray);
  return res.json({
    response: {
      operation: "median",
      value: result
    }
  })
})

/** Finds mode of nums in qs: returns {operation: "mean", result } */
app.get("/mode", function (req, res){
  const numsArray = convertStrNums(req.query.nums);
  const result = findMode(numsArray);
  return res.json({
    response: {
      operation: "mode",
      value: result
    }
  })
})

/** 404 handler: matches unmatched routes; raises NotFoundError. */




app.use(function (req, res) {
  throw new NotFoundError();
});



/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  const statusMessage = err.statusMessage;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);

  //TODO: this special handling isn't needed probably
  if (err instanceof BadRequestError){
    const newStatus = `${status} Bad Request`;
    return res.status(status).json({ error: { message, status: newStatus } });
  } else {
    return res.status(status).json({ error: { message, status } });
  }

});



module.exports = app;