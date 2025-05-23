import Employee from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee.repository";
import { LoggerService } from "./logger.service";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";

export default class EmployeeService {
  private logger = LoggerService.getInstance("EmployeeService()");
  constructor(private repo: EmployeeRepository) {}

  async createEmployee(employee: CreateEmployeeDto): Promise<Employee> {
    const newEmployee = plainToInstance(Employee, instanceToPlain(employee));
    return this.repo.create(newEmployee);
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

    return this.repo.updateOneById(employeeId, employeeData);
  }

  async deleteEmployeeById(employeeId: number): Promise<void> {
    this.repo.deleteCascadingOneById(employeeId);
  }
}
