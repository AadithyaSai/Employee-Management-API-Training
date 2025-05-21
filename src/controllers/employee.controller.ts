import { Request, Response, Router } from "express";
import EmployeeService from "../services/employee.service";

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

  async createEmployee(req: Request, res: Response) {
    const { name, email } = req.body;
    const savedEmployee = await this.employeeService.createEmployee(
      email,
      name
    );

    res.status(201).send(savedEmployee);
  }

  async getAllEmployees(req: Request, res: Response) {
    const employees = await this.employeeService.getAllEmployees();

    res.status(200).send(employees);
  }

  async getEmployeeById(req: Request, res: Response) {
    const employeeId = parseInt(req.params.id);
    const employee = await this.employeeService.getEmployeeById(employeeId);

    res.status(200).send(employee);
  }

  async updateEmployee(req: Request, res: Response) {
    const employeeId = parseInt(req.params.id);
    const { name, email } = req.body;
    const updatedEmployee = await this.employeeService.updateEmployeeById(
      employeeId,
      email,
      name
    );

    if (updatedEmployee) res.status(200).send(updatedEmployee);
    else res.status(404).send();
  }

  async deleteEmployee(req: Request, res: Response) {
    const employeeId = parseInt(req.params.id);
    await this.employeeService.deleteEmployeeById(employeeId);
    res.status(204).send();
  }
}
