import { Request, Response, Router, NextFunction } from "express";
import EmployeeService from "../services/employee.service";
import HttpException from "../exception/httpException";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";
import checkRole, {
  permissionsEnum,
} from "../middleware/authorization.middleware";

export default class EmployeeController {
  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.router.get(
      "/",
      checkRole([permissionsEnum.ReadEmployee]),
      this.getAllEmployees.bind(this)
    );
    this.router.get(
      "/:id",
      checkRole([permissionsEnum.ReadEmployee]),
      this.getEmployeeById.bind(this)
    );
    this.router.post(
      "/",
      checkRole([permissionsEnum.WriteEmployee]),
      this.createEmployee.bind(this)
    );
    this.router.put(
      "/:id",
      checkRole([permissionsEnum.WriteEmployee]),
      this.updateEmployee.bind(this)
    );
    this.router.delete(
      "/:id",
      checkRole([permissionsEnum.DeleteEmployee]),
      this.deleteEmployee.bind(this)
    );
  }

  async createEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
      const errors = await validate(createEmployeeDto);
      if (errors.length > 0) {
        throw new HttpException(400, JSON.stringify(errors));
      }
      createEmployeeDto;
      const savedEmployee = await this.employeeService.createEmployee(
        createEmployeeDto
      );

      res.status(201).send(savedEmployee);
    } catch (err) {
      next(err);
    }
  }

  async getAllEmployees(req: Request, res: Response, next: NextFunction) {
    try {
      const employees = await this.employeeService.getAllEmployees();

      res.status(200).send(employees);
    } catch (error) {
      next(error);
    }
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
        throw new HttpException(400, JSON.stringify(errors));
      }
      const updatedEmployee = await this.employeeService.updateEmployeeById(
        employeeId,
        updateEmployeeDto
      );

      res.status(200).send(updatedEmployee);
    } catch (err) {
      next(err);
    }
  }

  async deleteEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const employeeId = parseInt(req.params.id);
      await this.employeeService.deleteEmployeeById(employeeId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
