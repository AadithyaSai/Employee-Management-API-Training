import { Repository } from "typeorm";
import Employee from "../entities/employee.entity";

export default class EmployeeRepository {
  constructor(private repository: Repository<Employee>) {}

  async create(employee: Employee): Promise<Employee> {
    return this.repository.save(employee);
  }

  async findAll(): Promise<Employee[]> {
    return this.repository.find({
      relations: {
        address: true,
        department: true,
      },
    });
  }

  async fineOneById(employeeId: number): Promise<Employee> {
    return this.repository.findOne({
      where: { id: employeeId },
      relations: { address: true, department: true },
    });
  }

  async findOneByEmail(email: string): Promise<Employee> {
    return this.repository.findOneBy({ email });
  }

  async updateOneById(
    employeeId: number,
    employeeData: Employee
  ): Promise<Employee> {
    const employee = await this.fineOneById(employeeId);
    this.repository.merge(employee, employeeData);
    return await this.repository.save(employee);
  }

  async deleteDepartment(employeeId: number): Promise<void> {
    await this.repository.update({ id: employeeId }, { department: null });
  }

  async deleteOneById(employeeId: number): Promise<void> {
    await this.repository.delete({ id: employeeId });
  }

  async deleteCascadingOneById(employeeId: number): Promise<void> {
    const employee = await this.fineOneById(employeeId);
    if (employee) {
      await this.repository.softRemove(employee);
    }
  }
}
