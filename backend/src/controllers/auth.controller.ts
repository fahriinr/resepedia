import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { RowDataPacket } from "mysql2";

import { db } from "../config/db";

interface User extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  password: string;
}

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Type mysql2: rows = User[]
    const [rows] = await db.query<User[]>(
      "SELECT * FROM user WHERE email = ?",
      [email]
    );

    if (rows.length > 0)
      return res.status(400).json({ message: "Email already used" });

    const hash = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO user (name, email, password) VALUES (?, ?, ?)",
      [name, email, hash]
    );

    res.json({ message: "Registered successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
