import { NextFunction, Request, Response } from "express";

function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  res.on("finish", () => {
    console.log(`${res.statusCode} ${req.method} ${req.originalUrl}`);
  });
  next();
}

export default loggerMiddleware;
