import { db } from "../config/db";
import { RowDataPacket } from "mysql2";

interface User extends RowDataPacket {
  id_user: number;
  id?: number;
  name: string;
  email: string;
  password: string;
}

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const [rows] = await db.query<User[]>("SELECT * FROM user WHERE email = ?", [
    email,
  ]);

  return rows.length > 0 ? rows[0] : null;
};

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  await db.query("INSERT INTO user (name, email, password) VALUES (?, ?, ?)", [
    data.name,
    data.email,
    data.password,
  ]);
};

export const findUserById = async (
  id: number
): Promise<{ name: string; email: string } | null> => {
  const [rows] = await db.query<User[]>(
    "SELECT name, email FROM user WHERE id_user = ?",
    [id]
  );

  return rows.length > 0 ? { name: rows[0].name, email: rows[0].email } : null;
};

export const updateUser = async (
  id: number,
  data: {
    name?: string;
    email?: string;
    password?: string;
  }
) => {
  const updates: string[] = [];
  const values: any[] = [];

  if (data.name !== undefined) {
    updates.push("name = ?");
    values.push(data.name);
  }

  if (data.email !== undefined) {
    updates.push("email = ?");
    values.push(data.email);
  }

  if (data.password !== undefined) {
    updates.push("password = ?");
    values.push(data.password);
  }

  if (updates.length === 0) {
    return;
  }

  values.push(id);

  await db.query(
    `UPDATE user SET ${updates.join(", ")} WHERE id_user = ?`,
    values
  );
};
