import Item from "../models/item.model.js"
import {Op} from "sequelize"

export const fetchAllItems = async () => {
    try{

    const items  = Item.findAll();
    return items;
    } catch(error){
        throw new Error("Error      while fetching items"+error.message)
    }
}

export const createItemService = async (itemData) => {
    try{
      
        const newItem = await Item.create(itemData);
        return newItem;
    } catch(error) {
        throw new Error("Error creating item"+error.message)
    }
}

export const deleteItemService = async (itemId) => {
  try {
    const deletedCount = await Item.destroy({ where: { id: itemId } });

    if (deletedCount === 0) {
      // nothing was deleted
      throw new Error("Item not found");
    }

    return { message: "Item is Deleted Successfully" };
  } catch (error) {
    throw new Error("Error while deleting: " + error.message);
  }
};


export const updateItemService = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { name, stock_quantity, price } = req.body;

    const existingItem = await Item.findOne({ where: { id: itemId } });
    if (!existingItem) {
      throw new Error("Item not found");
    }

    await Item.update(
      { name, stock_quantity, price },
      { where: { id: itemId } }
    );

    return { message: "updated successfully" };
  } catch (error) {
    throw new Error("Error updating item: " + error.message);
  }
};


export const fetchItemWithId = async(itemId) => {
    try{
        const result = await Item.findOne({where:{id: itemId}})
           if (!result) {
      throw new Error("Item not found");
    }

        return result;
    }catch(error){
        throw new Error("error getting a item "+error.message)
    }
}

export const fetchLowStockInfo = async() => {
    try{
        const result = await Item.findAll({where: {stock_quantity :  {
            [Op.lt] : 5
        }}})
        return result

    }catch(error){
        throw new Error("error getting low stock item"+error.message)
    }
}

export  const sellItemService = async(quantitySold,itemId)=> {
    try{
        const result1 = await Item.findOne({where : {id: itemId},
         attributes:["stock_quantity"]})
     
         const quantityLeft = result1.stock_quantity - quantitySold
         if(quantityLeft < 0)
         {
            throw new Error("Quantity cannot be less than 0")
         }
         await Item.update({stock_quantity: quantityLeft},{where : {id : itemId}})

    
    return {message:"sold successfully"}

    }catch(error){
        throw new Error("error while sell"+error.message)
    }
}

export const fetchStats = async() => {
    try{
        const result = await Item.findAll({
           attributes: ["stock_quantity","price"],
        })
        const totalItems = result.reduce((sum,item) => sum + item.stock_quantity,0)

        const totalValue = result.reduce((sum,item) => sum + item.stock_quantity*item.price,0)


        return {totalItems, totalValue}

    }catch(error){
        throw new Error("error while fetching stats"+error.message)
    }
}

export const restockService = async(quantityBought,itemId) => {
    try{
        const result1 = await Item.findOne({where: {id: itemId} }, 
            {attributes: ["stock_quantity"]})
        

        const newQuantity = result1.stock_quantity + quantityBought
        await Item.update({stock_quantity:newQuantity},{where: {id: itemId}})
        return {message:"restocked successfully"} 
    }catch(error){
        throw new Error("error while restock"+error.message)
    }
}
