import { NextFunction, Request, Response, Router } from "express";
import AuthService from "../services/auth.service";
import HttpException from "../exception/httpException";

export default class AuthController {
  constructor(private authService: AuthService, private router: Router) {
    this.router.post("/login", this.login.bind(this));
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw new HttpException(400, "Bad request");
      }
      const token = await this.authService.login(email, password);
      res.status(200).send({ tokenType: "Bearer", accessToken: token });
    } catch (err) {
      next(err);
    }
  }
}
