import pool from "../config/db.js";
export const createUser = async ({ name, email, hashedPassword }) => {
  const query = `
    INSERT INTO users (name, email, password, created_at)
    VALUES ($1, $2, $3, NOW())
    RETURNING id, name, email, password, created_at`;
  const { rows } = await pool.query(query, [name, email, hashedPassword]);
  return rows[0];
};

export const findUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const { rows } = await pool.query(query, [email]);
  return rows[0];
};

export const findUserById = async (id) => {
  const query = `SELECT id, name, email, created_at FROM users WHERE id = $1`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};
