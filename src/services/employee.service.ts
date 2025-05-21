import Employee from "../entities/employee.entity";
import EmployeeRepository from "../repositories/employee.repository";

export default class EmployeeService {
  constructor(private repo: EmployeeRepository) {}

  async createEmployee(email: string, name: string): Promise<Employee> {
    const newEmployee = new Employee();
    newEmployee.email = email;
    newEmployee.name = name;
    return this.repo.create(newEmployee);
  }

  async getAllEmployees(): Promise<Employee[]> {
    return this.repo.findAll();
  }

  async getEmployeeById(employeeId: number): Promise<Employee> {
    return this.repo.fineOneById(employeeId);
  }

  async updateEmployeeById(employeeId: number, email?: string, name?: string) {
    const existingEmployee = await this.repo.fineOneById(employeeId);
    if (existingEmployee) {
      const employeeData = new Employee();
      employeeData.name = name;
      employeeData.email = email;
      return this.repo.updateOneById(employeeId, employeeData);
    }
  }

  async deleteEmployeeById(employeeId: number): Promise<void> {
    this.repo.deleteOneById(employeeId);
  }
}
