import pool from "../config/db.js";

export const addToCart = async (userId, productId, quantity) => {
  const query = `
    INSERT INTO cart (user_id, product_id, quantity) 
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, product_id)
    DO UPDATE SET quantity = cart.quantity + EXCLUDED.quantity
    RETURNING *
    `;
  const { rows } = await pool.query(query, [userId, productId, quantity]);
  return rows[0];
};

export const checkProductStock = async (productId, quantity) => {
  const query = `SELECT stock_quantity FROM products WHERE id = $1`;
  const { rows } = await pool.query(query, [productId]);
  if (!rows[0] || rows[0].stock_quantity < quantity) {
    throw new Error("Insufficient stock");
  }
};

export const getCartItems = async (userId) => {
  const query = `
  SELECT c.id AS cart_id,
  c.quantity,
  p.id AS product_id,
  p.name,
  p.price,
  p.image_url,
  p.stock_quantity
  from cart c 
  JOIN products p ON c.product_id = p.id
  WHERE c.user_id = $1`;
  const { rows } = await pool.query(query, [userId]);
  return rows;
};

export const deleteCartItem = async (userId, productId) => {
  const query = `DELETE FROM cart where user_id = $1 AND product_id = $2 RETURNING *`;
  const { rows } = await pool.query(query, [userId, productId]);
  return rows[0];
};
