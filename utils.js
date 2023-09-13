"use strict";
const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */
function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError that will
  // be handled in your route

  const strNumsArr = strNums.split(',');
  const nums = strNumsArr.map(str => {
    const number = Number(str);
    if (isNaN(number)) throw new BadRequestError(`${str} is not a number`);
    return number;
  })
  return nums;
}

// console.log(` processed string is`, convertStrNums(["pop","2","3","4","5"]))
module.exports = { convertStrNums };