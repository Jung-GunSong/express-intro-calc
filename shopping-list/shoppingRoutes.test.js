"use strict";

/*
STILL TO DO: write docstrings (we didn't forget)
finish testing error handling paths
*/

const request = require("supertest");
const app = require('./app');
let db = require('./fakeDb');


const milk = { "name": "milk", "price": 4.99 };
const crackers = { "name": "crackers", "price": 3.99 };

beforeEach(function () {
  db.items.push(milk);
  db.items.push(crackers);
});

afterEach(function () {
  db.items = [];
});


describe("get item(s)", function () {

  test("get a list of all the items", async function () {
    const resp = await request(app)
      .get("/items");

    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({
      items: [{ "name": "milk", "price": 4.99 },
      { "name": "crackers", "price": 3.99 }]
    });
  });

  test("get an individual item's details", async function () {
    const resp = await request(app).get("/items/milk");

    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({ "name": "milk", "price": 4.99 })
  })
})

describe("POST items/:name", function () {
  test("Test add item functionality", async function () {
    const resp = await request(app)
      .post('/items')
      .send({
        name: "apple",
        price: .99
      });

    expect(resp.statusCode).toEqual(201);
    expect(db.items.length).toEqual(3);
    expect(db.items[2].price).toEqual(.99);
  });

  /*below is untested! still need error routes*/
  // test("Test add item failure", async function () {
  //   const resp = await request(app)
  //     .post('/items')
  //     .send({
  //       name: "apple"
  //   });

  //   expect(resp.statusCode).toEqual(400);
  //   expect(db.items.length).toEqual(2);
  // })
});

describe("PATCH items/:name", function () {

  test("can you update an item", async function () {
    const resp = await request(app)
      .patch("/items/milk")
      .send({
        name: "horizon",
        price: 5.99
      });

    expect(resp.body).toEqual({
      updated: {
        name: "horizon",
        price: 5.99
      }
    });
    expect(resp.statusCode).toEqual(200);
    expect(db.items[0]).toEqual({
      name: "horizon",
      price: 5.99
    });
  });


  // test("update item failure??", async function () {

  // })
});





describe("delete item ", function () {
  test("delete an item from db.items", async function () {
    const resp = await request(app).delete("/items/milk");

    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({"message" : "Deleted"})
    expect(db.items.length).toEqual(1);
    expect(db.items[0]).toEqual({"name" : "crackers", "price" : 3.99 })
  })

  test("delete an item that doesn't exist", async function () {
    const resp = await request(app).delete("/items/definitelynotanitem");
    expect(resp.statusCode).toEqual(404);
    expect(resp.body).toEqual({
      "error": {
        "message": "Not Found",
        "status": 404
      }
    })
    expect(db.items.length).toEqual(2);
  })

})

