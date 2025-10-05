import { Sequelize } from "sequelize";
import mysql from "mysql2/promise";
import Item from "../models/item.model.js";

const DB_NAME = "inventory_db"
const DB_USER = "root"
const DB_PASSWD = "root"
const DB_HOST = "localhost"
const DB_PORT = 3306

//create the database if not exists
export async function createDatabase() {
  try {
    const connection = await mysql.createConnection({ host: DB_HOST, port: DB_PORT, user: DB_USER, password: DB_PASSWD });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    console.log(` Database "${DB_NAME}" created or already exists`);
    await connection.end();
  } catch (error) {
    console.error("Error creating database:", error);
  }
}


//dialect = mysql
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWD, {
  host: DB_HOST,
  dialect: "mysql",
  port: DB_PORT, // port should be here, not as password
});

//connect to database
export async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");

    // Auto-generate tables based on models
    await sequelize.sync({ force: false }); 
    // ⚠️ force:true will DROP & recreate tables on every restart
    // use alter:true if you want safe schema updates instead
    console.log("All models synchronized!");
  } catch (error) {
    console.error(" Database connection failed:", error);
  }
}

//create sample items if the table is empty
export async function seedItems() {
  const count = await Item.count();
  if (count === 0) {
    await Item.bulkCreate([
      { name: "Apple", description: "Fresh apples", stock_quantity: 50, price: 1.5 },
      { name: "Banana", description: "Ripe bananas", stock_quantity: 30, price: 1.0 },
      { name: "Orange", description: "Juicy oranges", stock_quantity: 20, price: 2.0 }
    ]);
    console.log("Seed data inserted");
  }
}



export default sequelize
