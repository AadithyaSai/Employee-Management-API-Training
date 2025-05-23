import { compare } from "bcrypt";
import HttpException from "../exception/httpException";
import EmployeeService from "./employee.service";
import JwtPayloadDto from "../dto/jwt-payload.dto";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { StringValue } from "ms";
import { LoggerService } from "./logger.service";

export default class AuthService {
  private logger = LoggerService.getInstance("AuthService()");

  constructor(private employeeService: EmployeeService) {}

  async login(email: string, password: string) {
    const employee = await this.employeeService.getEmployeeByEmail(email);
    if (!employee) {
      this.logger.info(`No such employee with email ${email}`);
      throw new HttpException(401, "Bad credentials");
    }
    const isPasswordValid = await compare(password, employee.password);

    if (!isPasswordValid) {
      this.logger.info(
        `Employee with email ${employee.email} attempted to log in without valid password`
      );
      throw new HttpException(401, "Bad credentials");
    }

    const payload: JwtPayloadDto = {
      id: employee.id,
      email: employee.email,
      roles: employee.roles,
    };

    this.logger.info(
      `Generated token for employee with email ${employee.email}`
    );
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_VALIDITY as StringValue,
    });
  }
}
