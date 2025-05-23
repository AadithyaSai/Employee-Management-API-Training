import { NextFunction, Request, Response } from "express";
import { LoggerService } from "../services/logger.service";

const logger = LoggerService.getInstance("loggerMiddleware()");

function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  res.on("finish", () => {
    logger.info(`${res.statusCode} ${req.method} ${req.originalUrl}`);
  });
  next();
}

export default loggerMiddleware;
