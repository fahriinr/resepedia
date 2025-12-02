import { db } from "../config/db";
import { RowDataPacket } from "mysql2";

interface User extends RowDataPacket {
  id: number;
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
