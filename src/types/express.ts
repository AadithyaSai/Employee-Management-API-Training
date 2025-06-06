import JwtPayloadDto from "../dto/jwt-payload.dto";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayloadDto;
    }
  }
}
