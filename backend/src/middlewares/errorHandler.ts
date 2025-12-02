import { Request, Response, NextFunction } from "express";
const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);
  res.status(500).send({ message: "Server Error", error: err.message });
};

// Middleware untuk logging setiap request yang masuk
const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
};

export { errorHandler, logger };
