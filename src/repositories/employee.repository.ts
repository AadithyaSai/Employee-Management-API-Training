import { Repository } from "typeorm";
import Employee from "../entities/employee.entity";
import HttpException from "../exception/httpException";

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
    const result = this.repository.findOne({
      where: { id: employeeId },
      relations: { address: true, department: true },
    });
    if (!result) throw new HttpException(404, "No such employee");
    return result;
  }

  async findOneByEmail(email: string): Promise<Employee> {
    const result = this.repository.findOneBy({ email });
    if (!result) throw new HttpException(404, "No such employee");
    return result;
  }

  async updateOneById(
    employeeId: number,
    employeeData: Employee
  ): Promise<Employee> {
    const employee = await this.findOneById(employeeId);
    if (!employee) throw new HttpException(404, "No such employee");
    this.repository.merge(employee, employeeData);
    return await this.repository.save(employee);
  }

  async deleteDepartment(employeeId: number): Promise<void> {
    const result = await this.repository.update(
      { id: employeeId },
      { department: null }
    );
    if (result.affected === 0) throw new HttpException(404, "No such employee");
  }

  async deleteCascadingOneById(employeeId: number): Promise<void> {
    const employee = await this.findOneById(employeeId);
    if (!employee) throw new HttpException(404, "No such employee");
    await this.repository.softRemove(employee);
  }
}
