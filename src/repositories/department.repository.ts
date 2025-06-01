import { Repository } from "typeorm";
import Department from "../entities/department.entity";
import EmployeeRepository from "./employee.repository";
import Employee from "../entities/employee.entity";

export default class departmentRepository {
  constructor(
    private repository: Repository<Department>,
    private employeeRepository: EmployeeRepository
  ) {}

  async getDepartments() {
    return this.repository.find();
  }

  async getEmployeesFromDepartment(departmentId: number) {
    return await this.repository
      .createQueryBuilder()
      .where("Department.id = :id", { id: departmentId })
      .leftJoinAndSelect("Department.employee", "Employees")
      .getOne();
  }

  async createDepartment(department: Department) {
    return this.repository.save(department);
  }

  async addEmployeeToDepartment(department: Department, employee: Employee) {
    employee.department = department;
    return await this.employeeRepository.updateOneById(employee.id, employee);
  }

  async merge(
    deptData1: Department,
    deptData2: Department
  ): Promise<Department> {
    return this.repository.merge(deptData1, deptData2);
  }

  async updateDepartment(departmentId: number, department: Department) {
    return this.repository.save(department);
  }

  async deleteDepartment(departmentId: number) {
    await this.repository.softDelete({ id: departmentId });
  }

  async removeEmployeeFromDepartment(departmentId: number, employeeId: number) {
    return await this.employeeRepository.deleteDepartment(employeeId);
  }
}
