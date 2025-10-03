import { jest } from "@jest/globals";
import supertest from "supertest";
import express from "express";

// mock Item model BEFORE importing controller
jest.unstable_mockModule("../models/item.model.js", () => ({
  default: {
    findOne: jest.fn(),
    update: jest.fn(),
  },
}));

// now import AFTER mock is set up
const { default: Item } = await import("../models/item.model.js");
const { sellItem } = await import("../controllers/items.controller.js");

const app = express();
app.use(express.json());
app.put("/sell/:id", sellItem);

describe("PUT /sell/:id", () => {
  it("should reduce the quantity when enough stock is available", async () => {
    Item.findOne.mockResolvedValue({ id: 1, stock_quantity: 5 });
    Item.update.mockResolvedValue([1]);

    const res = await supertest(app).put("/sell/1").send({ stock_quantity: 2 });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("sold successfully");
    expect(Item.update).toHaveBeenCalledWith(
      { stock_quantity: 3 }, // 5 - 2
      { where: { id: "1" } }
    );
  });

  it("should return 400 when selling more than available stock", async () => {
    Item.findOne.mockResolvedValue({ id: 1, stock_quantity: 1 });

    const res = await supertest(app).put("/sell/1").send({ stock_quantity: 5 });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("error while sellQuantity cannot be less than 0");
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
