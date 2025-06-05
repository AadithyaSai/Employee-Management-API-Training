import { EmployeeRoleEnum } from "../entities/employee.entity";

export default class JwtPayloadDto {
  id: number;
  email: string;
  role: EmployeeRoleEnum;
}
