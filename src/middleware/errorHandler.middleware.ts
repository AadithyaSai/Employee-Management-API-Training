import { NextFunction, Request, Response } from "express";
import HttpException from "../exception/httpException";

function errorHandlerMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (error instanceof HttpException) {
      const status = error.status || 500;
      const message = error.message || "Something went wrong";
      res.status(status).json({ message });
    } else {
      console.error(error.stack);
      res.status(500).send({ error: error.message });
    }
  } catch {
    next(error);
  }
}
export default errorHandlerMiddleware;
