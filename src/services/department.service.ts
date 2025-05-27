import { instanceToPlain, plainToInstance } from "class-transformer";
import CreateDepartmentDto from "../dto/create-department.dto";
import UpdateDepartmentDto from "../dto/update-department.dto";
import Department from "../entities/department.entity";
import departmentRepository from "../repositories/department.repository";
import { LoggerService } from "./logger.service";

export default class DepartmentService {
  private logger = LoggerService.getInstance("DepartmentService");
  constructor(private repo: departmentRepository) {}

  async getDepartments() {
    return this.repo.getDepartments();
  }

  async getEmployeesFromDepartment(departmentId: number) {
    return this.repo.getEmployeesFromDepartment(departmentId);
  }

  async createDepartment(department: CreateDepartmentDto) {
    const newDept = plainToInstance(Department, instanceToPlain(department));
    const result = await this.repo.createDepartment(newDept);
    this.logger.info(`Created department ${department.name}`);
    return result;
  }

  async addEmployeeToDepartment(departmentId: number, employeeId: number) {
    const result = await this.repo.addEmployeeToDepartment(
      departmentId,
      employeeId
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
    const result = await this.repo.updateDepartment(departmentId, newDept);
    this.logger.info(`Updated department ${department.name}`);
    return result;
  }

  async deleteDepartment(departmentId: number) {
    await this.repo.deleteDepartment(departmentId);
    this.logger.info(`Deleted department`);
  }

  async removeEmployeeFromDepartment(departmentId: number, employeeId: number) {
    this.logger.info(`Removed employee from department`);
    await this.repo.removeEmployeeFromDepartment(departmentId, employeeId);
  }
}
