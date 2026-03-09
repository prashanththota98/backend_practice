# E-Commerce Backend

Backend API for an e-commerce platform supporting role-based access for customers, sellers, and administrators.
The system allows users to register, authenticate using JWT, and manage products depending on their role.

## Tech Stack

- Node.js, Express.js
- PostgreSQL
- JWT Authentication
- Bcrypt for password hashing
- Middleware for role-based access control

### Users Table

- id (PK)
- name
- email (unique)
- password (hashed)
- role (customer | seller | admin)
- created_at

### Products Table

- id
- name
- description
- category
- price
- image_url
- stock_quantity
- created_at
- features
- user_id as foreign key from user table id

#### API Endpoints

- Register: api/users/register
- Seller Registration: api/users/seller/register
- Login: api/users/login
- Products: api/Products
