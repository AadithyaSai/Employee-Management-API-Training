import Employee from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee.repository";
import { LoggerService } from "./logger.service";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";
import { hash } from "bcrypt";
import HttpException from "../exception/httpException";

export default class EmployeeService {
  private logger = LoggerService.getInstance("EmployeeService()");
  constructor(private repo: EmployeeRepository) {}

  async createEmployee(employee: CreateEmployeeDto): Promise<Employee> {
    const newEmployee = plainToInstance(Employee, instanceToPlain(employee));
    newEmployee.password = await hash(newEmployee.password, 10);
    const result = await this.repo.create(newEmployee);
    this.logger.info(`Created new employee with email:${result.email}`);
    return result;
  }

  async getAllEmployees(): Promise<Employee[]> {
    return this.repo.findAll();
  }

  async getEmployeeById(employeeId: number): Promise<Employee> {
    const result = this.repo.findOneById(employeeId);
    if (!result) throw new HttpException(404, "No such employee");
    return result;
  }

  async getEmployeeByEmail(email: string): Promise<Employee> {
    const result = this.repo.findOneByEmail(email);
    if (!result) throw new HttpException(404, "No such employee");
    return result;
  }

  async updateEmployeeById(employeeId: number, employee: UpdateEmployeeDto) {
    const oldEmployee = await this.repo.findOneById(employeeId);
    if (!oldEmployee) throw new HttpException(404, "No such employee");

    const employeeData = plainToInstance(Employee, instanceToPlain(employee));
    employeeData.password = employeeData.password
      ? await hash(employeeData.password, 10)
      : undefined;

    const updatedEmployee = await this.repo.merge(oldEmployee, employeeData);
    const result = await this.repo.updateOneById(employeeId, updatedEmployee);
    this.logger.info(`Updated employee with email ${result.email}`);
    return result;
  }

  async deleteEmployeeById(employeeId: number): Promise<void> {
    const employee = await this.getEmployeeById(employeeId);
    if (!employee) throw new HttpException(404, "No such employee");
    await this.repo.deleteCascadingOneById(employee);
    this.logger.info(`Deleted employee`);
  }
}
