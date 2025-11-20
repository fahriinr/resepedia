import { Request, Response, NextFunction } from "express";
export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err);
  res.status(500).send({ message: "Server Error", error: err.message });
}
