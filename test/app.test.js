import { jest } from "@jest/globals";  // required in ESM
import supertest from "supertest";
import express from "express";
import { sellItem } from "../controllers/items.controller.js";

// 👇 mock the DB model in ESM
jest.unstable_mockModule("../models/item.model.js", () => ({
  default: {   // default export from your model file
    findOne: jest.fn(),
    update: jest.fn(),
  }
}));

// dynamic import after mocking
const { default: Item } = await import("../models/item.model.js");
//import Item from "../models/item.model.js";

const app = express();
app.use(express.json());
app.put("/sell/:id", sellItem);

describe("PUT /sell/:id", () => {
it("should reduce the quantity when enough stock is available", async () => {
  Item.findOne.mockResolvedValue({ id: 1, stock_quantity: 5 });
  Item.update.mockResolvedValue([1]);

  const res = await supertest(app)
    .put("/sell/1")
    .send({ stock_quantity: 2 });

  expect(res.status).toBe(201);
  expect(res.body.message).toBe("sold successfully"); // ✅
});


  it("should return 400 when selling more than available stock", async () => {
    Item.findOne.mockResolvedValue({ id: 1, stock_quantity: 1 });

    const res = await supertest(app)
      .put("/sell/1")
      .send({ stock_quantity: 5 });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Quantity cannot be less than 0");
  });
});


// describe("PUT /sell/:id", () => {
//   it("should return 400 when selling more than available stock", async () => {
//    // Item.findOne.mockResolvedValue({ stock_quantity: 1 });

//     const res = await supertest(app)
//       .put("/sell/1")
//       .send({ stock_quantity: 5 });

//     expect(res.status).toBe(400);
//     expect(res.body.error).toBe("Quantity cannot be less than 0");
//   });
// });
