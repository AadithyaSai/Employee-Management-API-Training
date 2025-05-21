import { Repository } from "typeorm";
import Employee from "../entities/employee.entity";

export default class EmployeeRepository {
  constructor(private repository: Repository<Employee>) {}

  async create(employee: Employee): Promise<Employee> {
    return this.repository.save(employee);
  }

  async findAll(): Promise<Employee[]> {
    return this.repository.find();
  }

  async fineOneById(employeeId: number): Promise<Employee> {
    return this.repository.findOneBy({ id: employeeId });
  }

  async updateOneById(
    employeeId: number,
    employeeData: Employee
  ): Promise<Employee> {
    await this.repository.update({ id: employeeId }, employeeData);
    return this.fineOneById(employeeId);
  }

  async deleteOneById(employeeId: number): Promise<void> {
    await this.repository.delete({ id: employeeId });
  }
}
