import { NextFunction, Request, Response } from "express";
import HttpException from "../exception/httpException";
import jwt from "jsonwebtoken";
import "dotenv/config";
import JwtPayloadDto from "../dto/jwt-payload.dto";

function getToken(req: Request): string {
  const token: string = req.headers.authorization;
  if (!token) throw new HttpException(401, "Not authorized");
  const tokenSplits = token.split(" ");
  if (tokenSplits.length != 2) {
    throw new HttpException(401, "Invalid or expired token");
  }
  return tokenSplits[1];
}

function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = getToken(req);
    if (!token) throw new HttpException(401, "Not authorized");
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload as JwtPayloadDto;
  } catch (error) {
    throw new HttpException(401, "Invalid or expired token");
  }
  next();
}

export default authenticationMiddleware;
