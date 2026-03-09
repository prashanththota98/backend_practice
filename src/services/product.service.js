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
    user_id,
  } = productdata;
  const query = `INSERT INTO products (name, description, category, price, image_url, stock_quantity, features, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`;
  const values = [
    name,
    description,
    category,
    price,
    image_url,
    stock_quantity || 0,
    features || {},
    user_id,
  ];

  const { rows } = await pool.query(query, values);
  return rows[0];
};

export const getProductById = async (id) => {
  const query = `SELECT * FROM products WHERE id = $1`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

export const deleteProductById = async (id) => {
  const query = `DELETE FROM products where id = $1 RETURNING *`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

export const updateProductById = async (id, updatedData) => {
  const fields = [];
  const values = [];
  let index = 1;
  if (!Object.keys(updatedData).length) {
    throw new Error("No fields provided to update");
  }
  for (const key in updatedData) {
    fields.push(`${key} = $${index}`);
    values.push(updatedData[key]);
    index++;
  }
  const query = `
  UPDATE products SET ${fields.join(", ")} WHERE id = $${index}`;
  values.push(id);

  const { rows } = await pool.query(query, values);
  return rows[0];
};
