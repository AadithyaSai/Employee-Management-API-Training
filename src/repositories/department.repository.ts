import { Repository } from "typeorm";
import Department from "../entities/department.entity";
import HttpException from "../exception/httpException";
import EmployeeRepository from "./employee.repository";

export default class departmentRepository {
  constructor(
    private repository: Repository<Department>,
    private employeeRepository: EmployeeRepository
  ) {}

  async getDepartments() {
    return this.repository.find();
  }

  async getEmployeesFromDepartment(departmentId: number) {
    const department = await this.repository.findOne({
      where: { id: departmentId },
    });
    if (!department) {
      throw new HttpException(404, "No such department");
    }

    return await this.repository
      .createQueryBuilder()
      .leftJoinAndSelect("Department.employee", "Employees")
      .getMany();
  }

  async createDepartment(department: Department) {
    return this.repository.save(department);
  }

  async addEmployee(departmentId: number, employeeId: number) {
    const department = await this.repository.findOne({
      where: { id: departmentId },
    });
    if (!department) {
      throw new HttpException(404, "No such department");
    }
    const employee = await this.employeeRepository.fineOneById(employeeId);
    if (!employee) {
      throw new HttpException(404, "No such employee");
    }

    employee.department = department;
    return await this.employeeRepository.updateOneById(employeeId, employee);
  }

  async updateDepartment(departmentId: number, department: Department) {
    const departmentDetails = await this.repository.findOne({
      where: { id: departmentId },
    });
    if (!departmentDetails) {
      throw new HttpException(404, "No such department");
    }

    this.repository.merge(departmentDetails, department);
    return this.repository.save(departmentDetails);
  }

  async deleteDepartment(departmentId: number) {
    if (!(await this.repository.findOneBy({ id: departmentId }))) {
      throw new HttpException(404, "No such department");
    }
    await this.repository.softDelete({ id: departmentId });
  }

  async deleteEmployee(departmentId: number, employeeId: number) {
    const employee = await this.employeeRepository.fineOneById(employeeId);

    if (
      !employee ||
      ~!employee.department ||
      employee.department.id != departmentId
    ) {
      throw new HttpException(404, "No such employee or department");
    }

    await this.employeeRepository.deleteDepartment(employeeId);
  }
}
