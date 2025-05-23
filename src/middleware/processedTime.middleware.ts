import { Request, Response, NextFunction } from "express";
import { LoggerService } from "../services/logger.service";

const logger = LoggerService.getInstance("processedTimeMiddleware()");

function processedTimeMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const startTime = new Date();
  res.end = (function (_super) {
    return function (chunk?: any, encodingOrCb?: any, cb?: any) {
      const processingTime = new Date().getTime() - startTime.getTime();
      logger.info(`Processed in ${processingTime}ms`);
      res.set("Response-Time", `${processingTime}`);
      return _super.call(res, chunk, encodingOrCb, cb);
    };
  })(res.end); // replaced end with a closure that sets header before invoking end

  next();
}

export default processedTimeMiddleware;
