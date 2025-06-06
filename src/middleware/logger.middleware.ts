import { NextFunction, Request, Response } from "express";
import { LoggerService } from "../services/logger.service";

const logger = LoggerService.getInstance("loggerMiddleware()");

function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  res.on("finish", () => {
    if (200 <= res.statusCode && res.statusCode <= 399) {
      // 2xx Success and 3xx Redirect
      logger.info(`${res.statusCode} ${req.method} ${req.originalUrl}`);
    } else {
      // Error codes
      logger.warn(`${res.statusCode} ${req.method} ${req.originalUrl}`);
    }
  });

  next();
}

export default loggerMiddleware;
