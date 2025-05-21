import { CreateAddressDto } from "../dto/create-address.dto";
import Address from "../entities/address.entity";
import Employee from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee.repository";

export default class EmployeeService {
  constructor(private repo: EmployeeRepository) {}

  async createEmployee(
    email: string,
    name: string,
    age: number,
    address: CreateAddressDto
  ): Promise<Employee> {
    const newEmployee = new Employee();
    newEmployee.email = email;
    newEmployee.name = name;
    newEmployee.age = age;
    console.log(address);
    newEmployee.address = new Address();
    newEmployee.address.line1 = address.line1;
    newEmployee.address.pincode = address.pincode;
    return this.repo.create(newEmployee);
  }

  async getAllEmployees(): Promise<Employee[]> {
    return this.repo.findAll();
  }

  async getEmployeeById(employeeId: number): Promise<Employee> {
    return this.repo.fineOneById(employeeId);
  }

  async updateEmployeeById(
    employeeId: number,
    email?: string,
    name?: string,
    age?: number,
    address?: Address
  ) {
    const existingEmployee = await this.repo.fineOneById(employeeId);
    if (existingEmployee) {
      const employeeData = new Employee();
      employeeData.name = name;
      employeeData.email = email;
      employeeData.age = age;
      employeeData.address = address;

      return this.repo.updateOneById(employeeId, employeeData);
    }
  }

  async deleteEmployeeById(employeeId: number): Promise<void> {
    this.repo.deleteCascadingOneById(employeeId);
  }
}
