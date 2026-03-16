import pool from "../config/db.js";

export const addAddress = async (
  userId,
  { street, city, state, postal_code, country, address_type },
) => {
  try {
    const query = `
        INSERT INTO addresses (user_id, street, city, state, postal_code, country, address_type, created_at, updated_at) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) 
        RETURNING *`;
    const values = [
      userId,
      street,
      city,
      state,
      postal_code,
      country,
      address_type,
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    throw new Error("Failed to add address: " + error.message);
  }
};

export const getAllAddress = async (userId) => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM addresses WHERE user_id = $1",
      [userId],
    );
    return rows;
  } catch (error) {
    throw new Error("Failed to fetch addresses from DB: " + error.message);
  }
};

export const getAddressSingle = async (userId, addressId) => {
  try {
    const query = `SELECT * FROM addresses where user_id = $1 AND id = $2`;
    const { rows } = await pool.query(query, [userId, addressId]);
    return rows[0];
  } catch (error) {
    throw new Error("Failed to fetch address from DB: " + error.message);
  }
};

export const deleteAddressById = async (userId, addressId) => {
  try {
    const query = `DELETE FROM addresses where user_id = $1 AND id = $2 RETURNING *`;
    const { rows } = await pool.query(query, [userId, addressId]);
    return rows[0];
  } catch (error) {
    throw new Error("failed to delete: " + error.message);
  }
};

export const updateAddressbyId = async (userId, addressId, updateData) => {
  try {
    const fields = [];
    const values = [];
    let index = 1;
    for (const key in updateData) {
      fields.push(`${key} = $${index}`);
      values.push(updateData[key]);
      index++;
    }
    values.push(userId);
    values.push(addressId);
    const query = `UPDATE addresses SET ${fields.join(", ")},
    updated_at = NOW() WHERE user_id = $${index} AND id = $${index + 1}
    RETURNING *`;
    const { rows } = await pool.query(query, values);
    return rows[0];
  } catch (error) {
    throw new Error("failed to update: " + error.message);
  }
};
