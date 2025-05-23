import Employee from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee.repository";
import { LoggerService } from "./logger.service";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";
import { hash } from "bcrypt";

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
    return this.repo.fineOneById(employeeId);
  }

  async getEmployeeByEmail(email: string): Promise<Employee> {
    return this.repo.findOneByEmail(email);
  }

  async updateEmployeeById(employeeId: number, employee: UpdateEmployeeDto) {
    const employeeData = plainToInstance(Employee, instanceToPlain(employee));
    employeeData.password = employeeData
      ? await hash(employeeData.password, 10)
      : null;

    const result = await this.repo.updateOneById(employeeId, employeeData);
    this.logger.info(`Updated employee with email ${result.email}`);
    return result;
  }

  async deleteEmployeeById(employeeId: number): Promise<void> {
    await this.repo.deleteCascadingOneById(employeeId);
    this.logger.info(`Deleted employee`);
  }
}
