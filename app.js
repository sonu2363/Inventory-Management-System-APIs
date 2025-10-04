
import express from "express"
import cors from "cors"
import itemRoutes from "./routes/item.routes.js"
import {connectDB, seedItems, createDatabase} from "./config/db.js"


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())

app.use(express.json())

app.use("/api/items",itemRoutes)

await createDatabase();

await connectDB();

// Seed data function

await seedItems();

app.listen(PORT,console.log("server started"))

