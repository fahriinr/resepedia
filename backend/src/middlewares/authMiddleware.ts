import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "No token" });

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "SECRET_JANGAN_BEGINI"
    );
    req.user = decoded; // sekarang TS ngerti
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
