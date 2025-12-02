import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/jwt.types";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;

  if (!header) return res.status(401).json({ message: "No token" });

  let token = header.split(" ")[1];

  token = token.replace(/^"|"$/g, "");

  const secret = process.env.JWT_SECRET || "SECRET123";

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;

    req.user = decoded;
    next();
  } catch (err: any) {
    res.status(401).json({
      message: "Invalid token",
      error: err.message, // Untuk debug, nanti hapus di production
    });
  }
};
