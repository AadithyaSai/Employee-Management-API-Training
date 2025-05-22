import { NextFunction, Request, Response, Router } from "express";
import DepartmentService from "../services/department.service";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import CreateDepartmentDto from "../dto/create-department.dto";
import HttpException from "../exception/httpException";
import UpdateDepartmentDto from "../dto/update-department.dto";

class DepartmentController {
  constructor(
    private departmentService: DepartmentService,
    private router: Router
  ) {
    this.router.post("/");
    this.router.get("/");
    this.router.get("/:id");
    this.router.post("/:id");
    this.router.put("/:id");
    this.router.delete("/:id");
    this.router.delete("/:id/:empid");
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
      const employees =
        this.departmentService.getEmployeesFromDepartment(deptId);
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
        console.log(JSON.stringify(errors));
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

  async addEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const empId = parseInt(req.params.empid);
      return await this.departmentService.addEmployee(empId);
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
        console.log(JSON.stringify(errors));
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

  async deleteEmployee(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async deleteDepartment(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (error) {
      next(error);
    }
  }
}
