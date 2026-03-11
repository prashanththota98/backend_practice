import pool from "../config/db.js";
export const saveRefreshToken = async (token, userId, expiresAt) => {
  const query = `
  INSERT INTO refresh_tokens (token, user_id, expires_at) VALUES ($1, $2, $3) 
    `;
  await pool.query(query, [token, userId, expiresAt]);
};

export const findRefreshToken = async (token) => {
  const query = `SELECT * from refresh_tokens where token = $1`;
  const { rows } = await pool.query(query, [token]);
  return rows[0] || null;
};

export const deleteRefreshToken = async (token) => {
  const query = `DELETE FROM refresh_tokens WHERE token = $1`;
  await pool.query(query, [token]);
};
