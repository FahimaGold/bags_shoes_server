# 🛍️ E-Commerce Backend API

A starter backend code built with **TypeScript**, **Node.js**, and **PostgreSQL** using **Sequelize ORM**.

## 🚀 Features

- 🔐 JWT-based user authentication
- 🛒 Cart functionality via many-to-many relationships (Users ↔ Products)
- 📦 Product catalog with brand, category, inventory, price, and image support
- 🧩 Sequelize + TypeScript decorators with strong typing
- 🗃️ PostgreSQL relational database integration
- 🔧 Easily extensible for payment (already included stripe payment starter code)

---

## 🛠️ Tech Stack

| Technology       | Purpose                        |
|------------------|--------------------------------|
| TypeScript       | Type-safe backend              |
| Node.js / Express| API server                     |
| PostgreSQL       | Relational DB                  |
| Sequelize        | ORM for model handling         |
| JWT              | Authentication                 |
| dotenv           | Environment config management  |

---
## 📐 Data Models & Associations

### 🧑 `User`
- `id`, `username`, `email`, `password`, `createdAt`, `updatedAt`
- Associations:
  - Belongs to many `Products` through `Cart`

### 👠 `Product`
- `brand`, `price`, `inventory`, `description`, `imgUrl`, `category`
- Associations:
  - Belongs to many `Users` through `Cart`

### 🛒 `Cart` (Join Table)
- Composite primary key: `userId`, `productId`
- Represents the many-to-many relation between `User` and `Product`

---
## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ecommerce-backend.git
cd bags_shoes_server
```

### 2. Install dependencies
`npm install`

### 3. Set up your environment variables
```bash
POSTGRESS_USERNAME=your_db_username
POSTGRESS_PASSWORD=your_db_password
POSTGRESS_DATABASE=your_database_name
POSTGRESS_HOST=localhost
```

### 4. Start the development server
`npm run dev`

## 📜 Scripts

| Command        | Description                     |
|----------------|---------------------------------|
| `npm run dev`  | Start dev server with hot reload|
| `npm run build`| Compile TypeScript              |
