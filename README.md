"# Inventory-Management-System-APIs" 

This project is a  Inventory Management System  backend built using Node.js, Express, Sequelize, and MySQL.

## Features

- Add, edit, delete, and view inventory items
- Sell and restock items with quantity tracking
- Low stock alerts alerts and filtering
- Inventory statistics (total items, total value)

### Tech Stack
- Node.js
- Express
- Sequelize ORM
- MySQL

## Project Structure 
```
backend/
    app.js
    package.json
    config/
      db.js
    controllers/
      items.controller.js
    models/
      item.model.js
    routes/
      item.routes.js
    services/
      item.service.js
    test/
      app.test.js
```

## Setup Instructions

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Configure Database:**
    - Default DB config is in [config/db.js](config/db.js) (MySQL, user: `root`, password: `root`, db: `inventory_db`).
    - The database will be created automatically if it does not exist.

3. **Run the server:**
   ```sh
   npm run dev
   ```
   The server will start on [http://localhost:5000](http: //localhost:5000).

4. **Run tests:**
```sh
npm run test
```

## API Endpoints

| Method | Endpoint                     | Description             |
|--------|------------------------------|-------------------------|
| GET    | `/api/items/getAll`          | Get all items           |
| GET    | `/api/items/getItem/:id`     | Get item by ID          |
| POST   | `/api/items/create`          | Create a new item       |
| PUT    | `/api/items/update/:itemId`  | Update an item          |
| DELETE | `/api/items/delete/:itemId`  | Delete an item          |
| PUT    | `/api/items/sell/:id`        | Sell item(reduce stock) |
| PUT    | `/api/items/restock/:id`     | Restock item (add stock)|
| GET    | `/api/items/low/stock`       | Get low stock items     | 
| GET    | `/api/items/stats`           | Get inventorystatistics |

## License

ISC