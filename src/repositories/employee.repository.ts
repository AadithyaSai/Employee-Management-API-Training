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

  async findOneById(employeeId: number): Promise<Employee> {
    return this.repository.findOne({
      where: { id: employeeId },
      relations: { address: true, department: true },
    });
  }

  async findOneByEmail(email: string): Promise<Employee> {
    return this.repository.findOneBy({ email });
  }

  async merge(
    employeeData1: Employee,
    employeeData2: Employee
  ): Promise<Employee> {
    return this.repository.merge(employeeData1, employeeData2);
  }

  async updateOneById(
    employeeId: number,
    employeeData: Employee
  ): Promise<Employee> {
    return await this.repository.save(employeeData);
  }

  async deleteDepartment(employeeId: number): Promise<boolean> {
    const result = await this.repository.update(
      { id: employeeId },
      { department: null }
    );
    return result.affected > 0;
  }

  async deleteCascadingOneById(employee: Employee): Promise<void> {
    await this.repository.softRemove(employee);
  }
}
