import pool from "../config/db.js";

export const createOrder = async (userId, addressId) => {
  const client = await pool.connect();
  console.log(addressId);
  try {
    await client.query("BEGIN");

    const { rows: cartItems } = await client.query(
      `SELECT c.product_id, c.quantity, p.stock_quantity, p.price 
        FROM cart c 
        JOIN products p ON c.product_id = p.id
        WHERE c.user_id = $1`,
      [userId],
    );
    if (cartItems.length === 0) {
      await client.query("ROLLBACK");
      return { error: "Cart is empty" };
    }

    const orderItems = [];

    for (const item of cartItems) {
      if (item.quantity > item.stock_quantity) {
        await client.query("ROLLBACK");
        throw new Error(`Insufficient stock for product ID ${item.product_id}`);
      }
    }

    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    const { rows: orderRows } = await client.query(
      `INSERT INTO orders (user_id, address_id, total_amount, created_at, updated_at) 
      VALUES ($1, $2, $3, NOW(), NOW())
      RETURNING *`,
      [userId, addressId, totalAmount],
    );

    const order = orderRows[0];
    for (const item of cartItems) {
      const { rows: orderItemRows } = await client.query(
        `
        INSERT INTO order_items (order_id, product_id, quantity, price, created_at, updated_at)
        VALUES ($1, $2, $3, $4, NOW(), NOW())
        RETURNING *`,
        [order.id, item.product_id, item.quantity, item.price],
      );
      orderItems.push(...orderItemRows);
      await client.query(
        `UPDATE products SET stock_quantity = stock_quantity - $1 WHERE id = $2`,
        [item.quantity, item.product_id],
      );
    }

    await client.query(`DELETE FROM cart WHERE user_id = $1`, [userId]);
    await client.query("COMMIT");
    return { ...order, items: orderItems };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};
