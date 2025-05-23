import { compare } from "bcrypt";
import HttpException from "../exception/httpException";
import EmployeeService from "./employee.service";
import JwtPayloadDto from "../dto/jwt-payload.dto";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { StringValue } from "ms";

export default class AuthService {
  constructor(private employeeService: EmployeeService) {}

  async login(email: string, password: string) {
    const employee = await this.employeeService.getEmployeeByEmail(email);
    if (!employee) {
      throw new HttpException(401, "Bad credentials");
    }
    const isPasswordValid = await compare(password, employee.password);

    if (!isPasswordValid) {
      throw new HttpException(401, "Bad credentials");
    }

    const payload: JwtPayloadDto = {
      id: employee.id,
      email: employee.email,
      roles: employee.roles,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_VALIDITY as StringValue,
    });
  }
}
