import pool from "../config/db.js";

export const createProduct = async (productdata) => {
  const {
    name,
    description,
    category,
    price,
    image_url,
    stock_quantity,
    features,
  } = productdata;
  const query = `INSERT INTO products (name, description, category, price, image_url, stock_quantity, features) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;
  const values = [
    name,
    description,
    category,
    price,
    image_url,
    stock_quantity || 0,
    features || {},
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
};
