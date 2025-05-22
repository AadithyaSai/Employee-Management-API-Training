import { Router } from "express";
import AuthService from "../services/auth.service";
import AuthController from "../controllers/auth.controller";
import { employeeService } from "./employee.route";

const authRouter = Router();
const authService = new AuthService(employeeService);
const authController = new AuthController(authService, authRouter);

export default authRouter;
