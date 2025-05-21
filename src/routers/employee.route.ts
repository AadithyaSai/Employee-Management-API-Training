import { Router } from "express";
import EmployeeRepository from "../repositories/employee.repository";
import dataSource from "../db/dataSource";
import Employee from "../entities/employee.entity";
import EmployeeService from "../services/employee.service";
import EmployeeController from "../controllers/employee.controller";

const employeeRouter = Router();

const employeeRepository = new EmployeeRepository(
  dataSource.getRepository(Employee)
);
const employeeService = new EmployeeService(employeeRepository);
const employeeController = new EmployeeController(
  employeeService,
  employeeRouter
);

export default employeeRouter;
