import { fetchAllItems, sellItemService, restockService, fetchStats, fetchLowStockInfo, fetchItemWithId, createItemService, deleteItemService, updateItemService} from "../services/items.service.js"

export const getAllItems = async(req,res) => {
    const items = await fetchAllItems();
    return res.status(200).json(items)
} 

export const createItem = async(req,res) => {
    console.log("req.body",req.body)
    const response = await createItemService(req.body);
    return res.status(201).json(response);
}

export const deleteItem = async(req,res) => {
  try{
    const itemId = req.params.itemId;
    const response = await deleteItemService(itemId);
    return res.status(200).json(response);
  }catch(error){
     if (error.message.includes("Item not found")) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export const updateItem = async(req,res) => {
   // const itemId = req.params.itemId;
   try{
    const response = await updateItemService(req,res);
    return res.status(201).json(response);
   }catch(error)
   {
     if (error.message.includes("Item not found")) {
      return res.status(400).json({ error: error.message });
    }
   }
}

export const getItemWithId = async(req,res) => {
  try{
    const itemId = req.params.id;
    const response = await fetchItemWithId(itemId)
    return res.status(200).json(response)
  }catch(error){
    if (error.message.includes("Item not found")) {
      return res.status(400).json({ error: error.message });
    }
  }
  }

export const getLowStockInfo = async(req,res) => {
    const response = await fetchLowStockInfo();
    return res.status(200).json(response);
}

export const sellItem = async (req, res) => {
  const quantitySold = req.body.stock_quantity;
  const itemId = req.params.id;

  try {
    const result = await sellItemService(quantitySold, itemId);
    return res.status(201).json(result );
  } catch (error) {
    console.error("SellItem Error:", error.message);

    if (error.message.includes("Quantity cannot be less than 0")) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal Server Error" });
  }
};


export const getStats = async(req,res) => {
    const response = await fetchStats();
    return res.status(200).json(response);
}

export const restockItem = async(req,res) => {
    const itemId = req.params.id
    console.log("req.bdoy",req.body)

    const quantityBought = req.body.stock_quantity
    console.log("quantityBought", quantityBought)
    const response = await restockService(quantityBought,itemId);
    return res.status(201).json(response);
}