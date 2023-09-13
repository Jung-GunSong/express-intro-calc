const request = require("supertest");

const app = require('./app');

let db = require('./fakeDb')


const milk = {"name" : "milk", "price" : 4.99}
const crackers = {"name": "crackers", "price" : 3.99}

beforeEach(function() {
  db.items.push(milk);
  db.items.push(crackers);
})


describe("POST items/:name", function() {
  test("Test add item functionality", async function() {
    const resp = await request(app)
      .post('/items')
      .send({
        name: "apple",
        price: .99
      })
    //now we expect db.items to be updated
    expect(db.items[2].price).toEqual(.99);
  })

})