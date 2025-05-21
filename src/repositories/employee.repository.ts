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
      },
    });
  }

  async fineOneById(employeeId: number): Promise<Employee> {
    return this.repository.findOne({
      where: { id: employeeId },
      relations: { address: true },
    });
  }

  async updateOneById(
    employeeId: number,
    employeeData: Employee
  ): Promise<Employee> {
    console.log(employeeData);
    await this.repository.save({ id: employeeId, ...employeeData });
    return this.fineOneById(employeeId);
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
