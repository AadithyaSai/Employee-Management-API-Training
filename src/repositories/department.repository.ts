import { Repository } from "typeorm";
import Department from "../entities/department.entity";
import HttpException from "../exception/httpException";

export default class departmentRepository {
  constructor(private repository: Repository<Department>) {}

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

    // return this.repository.findOne({ where: { id: departmentId } });
  }

  async createDepartment(department: Department) {}

  async addEmployee(employeeId: number) {}

  async updateDepartment(departmentId: number, department: Department) {}

  async deleteDepartment(departmentId: number) {}

  async deleteEmployee(departmentId: number, employeeId: number) {}
}
