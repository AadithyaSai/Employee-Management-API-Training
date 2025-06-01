import { Router } from "express";
import DepartmentRepository from "../repositories/department.repository";
import dataSource from "../db/dataSource";
import Department from "../entities/department.entity";
import DepartmentService from "../services/department.service";
import DepartmentController from "../controllers/department.controller";
import { employeeRepository, employeeService } from "./employee.route";

const departmentRouter = Router();

const departmentRepository = new DepartmentRepository(
  dataSource.getRepository(Department),
  employeeRepository
);
const departmentService = new DepartmentService(
  departmentRepository,
  employeeService
);
const departmentController = new DepartmentController(
  departmentService,
  departmentRouter
);

export default departmentRouter;
