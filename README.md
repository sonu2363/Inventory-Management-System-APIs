# Inventory Management System - Backend

This is the backend API for an Inventory Management System, built with Node.js, Express, Sequelize, and MySQL. It provides endpoints to manage inventory items, including adding, editing, deleting, selling, restocking, and viewing statistics.

## Features

- Add, edit, delete, and view inventory items
- Sell and restock items with quantity tracking
- Low stock alerts and filtering
- Inventory statistics (total items, total value)

## Setup Instructions

1. **Clone the repository and navigate to the backend folder:**
   ```sh
   git clone https://github.com/sonu2363/Inventory-Management-System-APIs.git
   cd backend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure the database:**
   - Default configuration is in [config/db.js](config/db.js) (MySQL, user: `root`, password: `root`, db: `inventory_db`).
   - The database will be created automatically if it does not exist.

4. **Run the server:**
   ```sh
   npm run dev
   ```
   The server will start on [http://localhost:5000](http://localhost:5000).

## Running Test Cases

To run the backend test cases:
```sh
npm run test
```
Test cases are located in [test/app.test.js](test/app.test.js).

## API Endpoints

| Method | Endpoint                     | Description             |
|--------|------------------------------|-------------------------|
| GET    | `/api/items/getAll`          | Get all items           |
| GET    | `/api/items/getItem/:id`     | Get item by ID          |
| POST   | `/api/items/create`          | Create a new item       |
| PUT    | `/api/items/update/:itemId`  | Update an item          |
| DELETE | `/api/items/delete/:itemId`  | Delete an item          |
| PUT    | `/api/items/sell/:id`        | Sell item (reduce stock)|
| PUT    | `/api/items/restock/:id`     | Restock item (add stock)|
| GET    | `/api/items/low/stock`       | Get low stock items     |
| GET    | `/api/items/stats`           | Get inventory statistics|

## Assumptions & Design Choices

- **Database:** Uses MySQL with default credentials (`root`/`root`). Change these in [config/db.js](config/db.js) if needed.
- **Seeding:** On first run, the app seeds the database with sample items if the table is empty.
- **Low Stock:** Items with `stock_quantity < 5` are considered low stock.
- **Error Handling:** Basic error handling is implemented for all endpoints.
- **Testing:** Uses Jest and Supertest for API endpoint testing.


## License

ISC