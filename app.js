
import express from "express"
import cors from "cors"
import itemRoutes from "./routes/item.routes.js"
import {connectDB, createDatabase} from "./config/db.js"
import Item from "./models/item.model.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())

app.use(express.json())

app.use("/api/items",itemRoutes)

await createDatabase();

await connectDB();

// Seed data function
async function seedItems() {
  const count = await Item.count();
  if (count === 0) {
    await Item.bulkCreate([
      { name: "Apple", description: "Fresh apples", stock_quantity: 50, price: 1.5 },
      { name: "Banana", description: "Ripe bananas", stock_quantity: 30, price: 1.0 },
      { name: "Orange", description: "Juicy oranges", stock_quantity: 20, price: 2.0 }
    ]);
    console.log("✅ Seed data inserted");
  }
}

await seedItems();

app.listen(PORT,console.log("server started"))

