import { NextFunction, Request, Response } from "express";

function delayMiddleware(req: Request, res: Response, next: NextFunction) {
  setTimeout(() => next(), Math.floor(200 + Math.random() * 799));
}

export default delayMiddleware;
