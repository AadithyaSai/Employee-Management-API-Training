import { NextFunction, Request, Response, Router } from "express";
import DepartmentService from "../services/department.service";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import CreateDepartmentDto from "../dto/create-department.dto";
import HttpException from "../exception/httpException";
import UpdateDepartmentDto from "../dto/update-department.dto";
import checkRole, {
  permissionsEnum,
} from "../middleware/authorization.middleware";

export default class DepartmentController {
  constructor(
    private departmentService: DepartmentService,
    private router: Router
  ) {
    this.router.post(
      "/",
      checkRole([permissionsEnum.WriteDepartment]),
      this.createDepartment.bind(this)
    );
    this.router.get(
      "/",
      checkRole([permissionsEnum.ReadDepartment]),
      this.getDepartments.bind(this)
    );
    this.router.put(
      "/:id",
      checkRole([permissionsEnum.ReadDepartment, permissionsEnum.ReadEmployee]),
      this.updateDepartment.bind(this)
    );
    this.router.delete(
      "/:id",
      checkRole([permissionsEnum.DeleteDepartment]),
      this.deleteDepartment.bind(this)
    );
    this.router.post(
      "/:id/employees/:empid",
      checkRole([permissionsEnum.WriteEmployee]),
      this.addEmployeeToDepartment.bind(this)
    );
    this.router.get(
      "/:id/employees",
      checkRole([permissionsEnum.ReadDepartment, permissionsEnum.ReadEmployee]),
      this.getEmployeesFromDepartment.bind(this)
    );
    this.router.delete(
      "/:id/employees/:empid",
      checkRole([permissionsEnum.DeleteDepartment]),
      this.removeEmployeeFromDepartment.bind(this)
    );
  }

  async getDepartments(req: Request, res: Response, next: NextFunction) {
    try {
      const departments = await this.departmentService.getDepartments();

      res.status(200).send(departments);
    } catch (error) {
      next(error);
    }
  }

  async getEmployeesFromDepartment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const deptId = parseInt(req.params.id);
      const employees = await this.departmentService.getEmployeesFromDepartment(
        deptId
      );
      res.status(200).send(employees);
    } catch (error) {
      next(error);
    }
  }

  async createDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const createDepartmentDto = plainToInstance(
        CreateDepartmentDto,
        req.body
      );
      const errors = await validate(createDepartmentDto);
      if (errors.length > 0) {
        throw new HttpException(400, JSON.stringify(errors));
      }
      const savedDepartment = await this.departmentService.createDepartment(
        createDepartmentDto
      );

      res.status(201).send(savedDepartment);
    } catch (error) {
      next(error);
    }
  }

  async addEmployeeToDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const deptId = parseInt(req.params.id);
      const empId = parseInt(req.params.empid);

      if (Number.isNaN(empId)) throw new HttpException(400, "Bad request");

      const result = await this.departmentService.addEmployeeToDepartment(
        deptId,
        empId
      );
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async updateDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const deptId = parseInt(req.params.id);
      const updateDepartmentDto = plainToInstance(
        UpdateDepartmentDto,
        req.body
      );
      const errors = await validate(updateDepartmentDto);
      if (errors.length > 0) {
        throw new HttpException(400, JSON.stringify(errors));
      }
      const savedDepartment = await this.departmentService.updateDepartment(
        deptId,
        updateDepartmentDto
      );

      res.status(200).send(savedDepartment);
    } catch (error) {
      next(error);
    }
  }

  async deleteDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const deptId = Number(req.params.id);
      await this.departmentService.deleteDepartment(deptId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async removeEmployeeFromDepartment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const deptId = Number(req.params.id);
    const empId = Number(req.params.empid);

    await this.departmentService.removeEmployeeFromDepartment(deptId, empId);
    res.status(204).send();
    try {
    } catch (error) {
      next(error);
    }
  }
}
