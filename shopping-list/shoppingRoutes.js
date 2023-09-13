const express = require("express")

const db = require("./fakeDb")
const router = new express.Router();


router.get("/", function(req, res) {
  return res.json({ items: db.items })
})

router.post("/", function(req, res){
  //TODO: do we need to check for error handling here?
  let newItem = {
    "name" : req.body.name,
    "price" : req.body.price
  }
  //Super authentic update to database:
  db.items.push(newItem);
  return res.json(newItem);
})

/**
 * Item details
 * TODO: check if filter returns an array if we're only grabbing one item max.
 */
router.get("/:name", function(req, res){
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

  //TODO: do we need to check for error handling here?
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

  //TODO: alternate with filter, is there a preferred practice?
  // let remainingItems = db.items.filter(item => {
  //   if (!item.name === name){
  //     return item;
  //   }
  // })
  // db.items = remainingItems;

  for (let i = 0; i < db.items.length; i++){
    let currItem = db.items[i];
    if (currItem["name"] === name){
      db.items.splice(i, 1);
      break;
    }
  }
  return res.json({"message" : "Deleted"})
})


module.exports = router;
