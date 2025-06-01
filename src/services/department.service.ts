import { instanceToPlain, plainToInstance } from "class-transformer";
import CreateDepartmentDto from "../dto/create-department.dto";
import UpdateDepartmentDto from "../dto/update-department.dto";
import Department from "../entities/department.entity";
import departmentRepository from "../repositories/department.repository";
import { LoggerService } from "./logger.service";
import HttpException from "../exception/httpException";
import EmployeeService from "./employee.service";

export default class DepartmentService {
  private logger = LoggerService.getInstance("DepartmentService");
  constructor(
    private repo: departmentRepository,
    private employeeService: EmployeeService
  ) {}

  async getDepartments() {
    return this.repo.getDepartments();
  }

  async getEmployeesFromDepartment(departmentId: number) {
    const department = (await this.repo.getDepartments()).find(
      (dept) => dept.id === departmentId
    );

    if (!department) {
      throw new HttpException(404, "No such department");
    }

    return this.repo.getEmployeesFromDepartment(departmentId);
  }

  async createDepartment(department: CreateDepartmentDto) {
    const newDept = plainToInstance(Department, instanceToPlain(department));
    const result = await this.repo.createDepartment(newDept);
    this.logger.info(`Created department ${department.name}`);
    return result;
  }

  async addEmployeeToDepartment(departmentId: number, employeeId: number) {
    const department = (await this.repo.getDepartments()).find(
      (dept) => dept.id === departmentId
    );

    if (!department) {
      throw new HttpException(404, "No such department");
    }

    const employee = await this.employeeService.getEmployeeById(employeeId);
    if (!employee) {
      throw new HttpException(404, "No such employee");
    }

    const result = await this.repo.addEmployeeToDepartment(
      department,
      employee
    );
    this.logger.info(
      `Employee with email ${result.email} added to department ${result.department.name}`
    );
    return result;
  }

  async updateDepartment(
    departmentId: number,
    department: UpdateDepartmentDto
  ) {
    const newDept = plainToInstance(Department, instanceToPlain(department));
    const oldDept = (await this.repo.getDepartments()).find(
      (dept) => dept.id === departmentId
    );

    const updatedDept = await this.repo.merge(oldDept, newDept);
    const result = await this.repo.updateDepartment(departmentId, updatedDept);
    this.logger.info(`Updated department ${department.name}`);
    return result;
  }

  async deleteDepartment(departmentId: number) {
    const dept = (await this.repo.getDepartments()).find(
      (dept) => dept.id === departmentId
    );

    if (!dept) throw new HttpException(404, "No such department");

    await this.repo.deleteDepartment(departmentId);
    this.logger.info(`Deleted department`);
  }

  async removeEmployeeFromDepartment(departmentId: number, employeeId: number) {
    const employee = await this.employeeService.getEmployeeById(employeeId);
    if (
      !employee ||
      !employee.department ||
      employee.department.id != departmentId
    ) {
      throw new HttpException(404, "No such employee or department");
    }

    const hasBeenDeleted = await this.repo.removeEmployeeFromDepartment(
      departmentId,
      employeeId
    );

    if (!hasBeenDeleted)
      throw new HttpException(404, "Cannot delete employee from department");

    this.logger.info(`Removed employee from department`);
  }
}
