import { Request, Response, NextFunction } from "express";
import HttpException from "../exception/httpException";
import { EmployeeRoleEnum } from "../entities/employee.entity";

export enum permissionsEnum {
  ReadEmployee,
  ReadDepartment,
  WriteEmployee,
  WriteDepartment,
  DeleteEmployee,
  DeleteDepartment,
}

const permissions = {
  [EmployeeRoleEnum.HR]: [
    permissionsEnum.ReadEmployee,
    permissionsEnum.ReadDepartment,
    permissionsEnum.WriteEmployee,
    permissionsEnum.DeleteEmployee,
  ],
  [EmployeeRoleEnum.DEVELOPER]: [
    permissionsEnum.ReadEmployee,
    permissionsEnum.ReadDepartment,
  ],
  [EmployeeRoleEnum.UI]: [
    permissionsEnum.ReadEmployee,
    permissionsEnum.ReadDepartment,
  ],
  [EmployeeRoleEnum.UX]: [
    permissionsEnum.ReadEmployee,
    permissionsEnum.ReadDepartment,
  ],
  [EmployeeRoleEnum.ADMIN]: [
    permissionsEnum.ReadEmployee,
    permissionsEnum.ReadDepartment,
    permissionsEnum.WriteEmployee,
    permissionsEnum.WriteDepartment,
    permissionsEnum.DeleteEmployee,
    permissionsEnum.DeleteDepartment,
  ],
};

export default function checkRole(actions: permissionsEnum[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const role = req.user.role;
      actions.forEach((action) => {
        if (!permissions[role].includes(action)) {
          throw new HttpException(403, "User is not authorized");
        }
      });
      next();
    } catch (error) {
      next(error);
    }
  };
}
