import { CreateAddressDto } from "../dto/create-address.dto";
import { UpdateAddressDto } from "../dto/update-address.dto";
import Address from "../entities/address.entity";
import Employee, { EmployeeRoleEnum } from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee.repository";
import { hash } from "bcrypt";
import { LoggerService } from "./logger.service";

export default class EmployeeService {
  private logger = LoggerService.getInstance("EmployeeService()");
  constructor(private repo: EmployeeRepository) {}

  async createEmployee(
    email: string,
    password: string,
    name: string,
    age: number,
    roles: EmployeeRoleEnum,
    address: CreateAddressDto
  ): Promise<Employee> {
    const newEmployee = new Employee();
    newEmployee.email = email;
    newEmployee.name = name;
    newEmployee.password = await hash(password, 10);
    newEmployee.age = age;
    newEmployee.roles = roles;
    newEmployee.address = new Address();
    newEmployee.address.line1 = address.line1;
    newEmployee.address.pincode = address.pincode;
    return this.repo.create(newEmployee);
  }

  async getAllEmployees(): Promise<Employee[]> {
    return this.repo.findAll();
  }

  async getEmployeeById(employeeId: number): Promise<Employee> {
    if (employeeId == 2) throw new Error();
    return this.repo.fineOneById(employeeId);
  }

  async getEmployeeByEmail(email: string): Promise<Employee> {
    return this.repo.findOneByEmail(email);
  }

  async updateEmployeeById(
    employeeId: number,
    email?: string,
    password?: string,
    name?: string,
    age?: number,
    roles?: EmployeeRoleEnum,
    address?: UpdateAddressDto
  ) {
    const employeeData = new Employee();
    employeeData.name = name;
    employeeData.email = email;
    employeeData.password = password ? await hash(password, 10) : undefined;
    employeeData.roles = roles;
    employeeData.age = age;
    if (address) {
      employeeData.address = new Address();
      employeeData.address.line1 = address.line1;
      employeeData.address.pincode = address.pincode;
    }

    return this.repo.updateOneById(employeeId, employeeData);
  }

  async deleteEmployeeById(employeeId: number): Promise<void> {
    this.repo.deleteCascadingOneById(employeeId);
  }
}
