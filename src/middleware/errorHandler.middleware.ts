import { NextFunction, Request, Response } from "express";
import HttpException from "../exception/httpException";
import { LoggerService } from "../services/logger.service";

const logger = LoggerService.getInstance("errorHandlerMiddleware()");

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
      logger.error(error.message);
      logger.debug(error.stack);
      res.status(500).send({ error: error.message });
    }
  } catch {
    next(error);
  }
}
export default errorHandlerMiddleware;
