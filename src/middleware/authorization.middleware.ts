import { Request, Response, NextFunction } from "express";
import HttpException from "../exception/httpException";
import { EmployeeRoleEnum } from "../entities/employee.entity";

export default function checkRole(role: EmployeeRoleEnum) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const roles = req.user.roles;
      if (roles !== "HR") {
        throw new HttpException(403, "User does not have correct privileges");
      }
      next();
    } catch (error) {
      next(error);
    }
  };
}
