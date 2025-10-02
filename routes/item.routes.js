import { getAllItems, sellItem, getStats, restockItem, getLowStockInfo, getItemWithId, createItem, deleteItem, updateItem } from "../controllers/items.controller.js"

import express from "express"
const router = express.Router()


router.get("/getAll",getAllItems)
router.get("/getItem/:id",getItemWithId)
router.post("/create",createItem)
router.delete("/delete/:itemId",deleteItem)
router.put("/update/:itemId",updateItem)
router.get("/low/stock",getLowStockInfo)
router.put("/sell/:id",sellItem)
router.get("/stats",getStats)// { totalItems, totalValue }
router.put("/restock/:id",restockItem)

export default  router;