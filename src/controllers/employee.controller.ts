import { Request, Response, Router, NextFunction } from "express";
import EmployeeService from "../services/employee.service";
import Address from "../entities/address.entity";
import HttpException from "../exception/httpException";
import { isEmail } from "../validators/emailValidator";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";

export default class EmployeeController {
  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {
    router.get("/", this.getAllEmployees.bind(this));
    router.get("/:id", this.getEmployeeById.bind(this));
    router.post("/", this.createEmployee.bind(this));
    router.put("/:id", this.updateEmployee.bind(this));
    router.delete("/:id", this.deleteEmployee.bind(this));
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
        createEmployeeDto.name,
        createEmployeeDto.age,
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
        updateEmployeeDto.name,
        updateEmployeeDto.age,
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
