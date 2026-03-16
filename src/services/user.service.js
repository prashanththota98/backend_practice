import pool from "../config/db.js";
export const createUser = async ({ name, email, hashedPassword }) => {
  const query = `
    INSERT INTO users (name, email, password, created_at)
    VALUES ($1, $2, $3, NOW())
    RETURNING id, name, email, role, created_at`;
  const { rows } = await pool.query(query, [name, email, hashedPassword]);
  return rows[0];
};

export const createSeller = async ({ name, email, hashedPassword, role }) => {
  const query = `
  INSERT INTO users (name, email, password, role, created_at)
  VALUES ($1, $2, $3, $4, now())
  RETURNING id, name, email,role, created_at`;
  const { rows } = await pool.query(query, [name, email, hashedPassword, role]);
  return rows[0];
};

export const findUserByEmail = async (email) => {
  const query = `SELECT id, name, email, password, role, created_at FROM users WHERE email = $1`;
  const { rows } = await pool.query(query, [email]);
  return rows[0];
};

export const findUserById = async (id) => {
  const query = `SELECT id, name, email, created_at FROM users WHERE id = $1::int`;
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

export const updateUserDetails = async (id, updatedFields) => {
  const fields = [];
  const values = [];
  let index = 1;

  if (!Object.keys(updatedFields).length) {
    throw new Error("No fields provided to update");
  }

  for (const key in updatedFields) {
    fields.push(`${key} = $${index}`);
    values.push(updatedFields[key]);
    index++;
  }
  values.push(id);
  const query = `
  UPDATE USERS SET ${fields.join(", ")}, updated_at = NOW()
  WHERE id = $${index}
  RETURNING id, name, email, role`;

  const { rows } = await pool.query(query, values);
  return rows[0];
};
