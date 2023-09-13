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

describe("POST items/:name", function () {
  test("Test add item functionality", async function () {
    const resp = await request(app)
      .post('/items')
      .send({
        name: "apple",
        price: .99
      });
    //now we expect db.items to be updated
    expect(resp.statusCode).toEqual(200);
    expect(db.items[2].price).toEqual(.99);
  });

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

});

describe("get all the items", function () {

  test("get a list of all the items", async function () {
    const resp = await request(app)
      .get("/items");

    expect(resp.statusCode).toEqual(200);
    expect(resp.body).toEqual({
      items: [{ "name": "milk", "price": 4.99 },
      { "name": "crackers", "price": 3.99 }]
    });
  });
})

