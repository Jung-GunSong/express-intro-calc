//FIXME: CONST check
//FIXME: filter over weird for loop logic. (Don't worry too much about multiple items)

const express = require("express")
const db = require("./fakeDb")
const { NotFoundError, BadRequestError } = require("./expressError");

const router = new express.Router();


router.get("/", function(req, res) {
  return res.json({ items: db.items })
})

router.post("/", function(req, res){
  const newItem = {
    "name" : req.body.name,
    "price" : req.body.price
  }
  //TODO: check for presence of request body, then throw error if problem.
  db.items.push(newItem); //Super authentic update to database:
  return res.status(201).json(newItem);
})

/**
 * Item details
 */
router.get("/:name", function(req, res){
  //TODO: error handling, multiple items/doesn't exist.
  let name = req.params.name;
  let currItem = db.items.filter(item => {
    if (item.name === name){
      return item;
    }
  })
  return res.json(currItem[0]);
})


router.patch("/:name", function(req, res){
  let name = req.params.name;

  //TODO: error handling for updating something that doesn't exist
  let newItem = {
    "name": req.body.name,
    "price": req.body.price
  }

  for (let i = 0; i < db.items.length; i++){
    let currItem = db.items[i];
    if (currItem["name"] === name){
      db.items[i] = newItem;
      break;
    }
  }
  return res.json({"updated" : newItem})
})


router.delete("/:name", function(req, res){
  let name = req.params.name;

  for (let i = 0; i < db.items.length; i++){
    let currItem = db.items[i];
    if (currItem["name"] === name){
      db.items.splice(i, 1);
      return res.json({"message" : "Deleted"})
    }
  }

  throw new NotFoundError;
})


module.exports = router;
