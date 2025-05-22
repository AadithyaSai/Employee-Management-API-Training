import {
  instanceToInstance,
  instanceToPlain,
  plainToClass,
  plainToInstance,
} from "class-transformer";
import CreateDepartmentDto from "../dto/create-department.dto";
import UpdateDepartmentDto from "../dto/update-department.dto";
import Department from "../entities/department.entity";
import departmentRepository from "../repositories/department.repository";

export default class DepartmentService {
  constructor(private repo: departmentRepository) {}

  async getDepartments() {
    return this.repo.getDepartments();
  }

  async getEmployeesFromDepartment(departmentId: number) {
    return this.repo.getEmployeesFromDepartment(departmentId);
  }

  async createDepartment(department: CreateDepartmentDto) {
    const newDept = plainToInstance(Department, instanceToPlain(department));
    return this.repo.createDepartment(newDept);
  }

  async addEmployee(employeeId: number) {
    return this.repo.addEmployee(employeeId);
  }

  async updateDepartment(
    departmentId: number,
    department: UpdateDepartmentDto
  ) {
    const newDept = plainToInstance(Department, instanceToPlain(department));
    return this.repo.updateDepartment(departmentId, newDept);
  }

  async deleteDepartment(departmentId: number) {
    this.repo.deleteDepartment(departmentId);
  }

  async deleteEmployee(departmentId: number, employeeId: number) {
    this.repo.deleteEmployee(departmentId, employeeId);
  }
}
