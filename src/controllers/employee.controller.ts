import { Request, Response, Router, NextFunction } from "express";
import EmployeeService from "../services/employee.service";
import HttpException from "../exception/httpException";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";
import checkRole from "../middleware/authorization.middleware";
import { EmployeeRoleEnum } from "../entities/employee.entity";

export default class EmployeeController {
  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.router.get("/", this.getAllEmployees.bind(this));
    this.router.get("/:id", this.getEmployeeById.bind(this));
    this.router.post(
      "/",
      checkRole(EmployeeRoleEnum.HR),
      this.createEmployee.bind(this)
    );
    this.router.put(
      "/:id",
      checkRole(EmployeeRoleEnum.HR),
      this.updateEmployee.bind(this)
    );
    this.router.delete(
      "/:id",
      checkRole(EmployeeRoleEnum.HR),
      this.deleteEmployee.bind(this)
    );
  }

  async createEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
      const errors = await validate(createEmployeeDto);
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }
      const savedEmployee = await this.employeeService.createEmployee(
        createEmployeeDto.email,
        createEmployeeDto.password,
        createEmployeeDto.name,
        createEmployeeDto.age,
        createEmployeeDto.roles,
        createEmployeeDto.address
      );

      res.status(201).send(savedEmployee);
    } catch (err) {
      next(err);
    }
  }

  async getAllEmployees(req: Request, res: Response) {
    const employees = await this.employeeService.getAllEmployees();

    res.status(200).send(employees);
  }

  async getEmployeeById(req: Request, res: Response, next: NextFunction) {
    try {
      const employeeId = parseInt(req.params.id);
      const employee = await this.employeeService.getEmployeeById(employeeId);

      if (!employee) {
        throw new HttpException(404, "Employee not found");
      }

      res.status(200).send(employee);
    } catch (err) {
      next(err);
    }
  }

  async updateEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const employeeId = parseInt(req.params.id);
      const employee = await this.employeeService.getEmployeeById(employeeId);
      if (!employee) {
        throw new HttpException(404, "Employee not found");
      }
      const updateEmployeeDto = plainToInstance(UpdateEmployeeDto, req.body);
      const errors = await validate(updateEmployeeDto);
      if (errors.length > 0) {
        console.log(JSON.stringify(errors));
        throw new HttpException(400, JSON.stringify(errors));
      }
      const updatedEmployee = await this.employeeService.updateEmployeeById(
        employeeId,
        updateEmployeeDto.email,
        updateEmployeeDto.password,
        updateEmployeeDto.name,
        updateEmployeeDto.age,
        updateEmployeeDto.roles,
        updateEmployeeDto.address
      );

      res.status(200).send(updatedEmployee);
    } catch (err) {
      next(err);
    }
  }

  async deleteEmployee(req: Request, res: Response) {
    const employeeId = parseInt(req.params.id);
    await this.employeeService.deleteEmployeeById(employeeId);
    res.status(204).send();
  }
}
