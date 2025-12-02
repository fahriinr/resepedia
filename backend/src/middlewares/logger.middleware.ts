import { Request, Response, NextFunction } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  const method = req.method;
  const url = req.originalUrl;

  // Listen ketika response selesai
  res.on("finish", () => {
    const duration = Date.now() - start;
    const status = res.statusCode;

    console.log(
      `[${new Date().toISOString()}] ${method} ${url} ${status} - ${duration}ms`
    );

    // Kalau mau lihat body request (hati-hati kalau password)
    if (method !== "GET") {
      console.log("Body:", req.body);
    }
  });

  next();
};
